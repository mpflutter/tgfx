/////////////////////////////////////////////////////////////////////////////////////////////////
//
//  Tencent is pleased to support the open source community by making tgfx available.
//
//  Copyright (C) 2023 THL A29 Limited, a Tencent company. All rights reserved.
//
//  Licensed under the BSD 3-Clause License (the "License"); you may not use this file except
//  in compliance with the License. You may obtain a copy of the License at
//
//      https://opensource.org/licenses/BSD-3-Clause
//
//  unless required by applicable law or agreed to in writing, software distributed under the
//  license is distributed on an "as is" basis, without warranties or conditions of any kind,
//  either express or implied. see the license for the specific language governing permissions
//  and limitations under the license.
//
/////////////////////////////////////////////////////////////////////////////////////////////////

#include "EAGLHardwareTexture.h"
#include "opengl/GLCaps.h"
#include "opengl/GLSampler.h"
#include "tgfx/opengl/eagl/EAGLDevice.h"
#include "utils/UniqueID.h"

namespace tgfx {
static CVOpenGLESTextureRef GetTextureRef(Context* context, CVPixelBufferRef pixelBuffer,
                                          PixelFormat pixelFormat,
                                          CVOpenGLESTextureCacheRef textureCache) {
  if (textureCache == nil) {
    return nil;
  }
  auto width = static_cast<int>(CVPixelBufferGetWidth(pixelBuffer));
  auto height = static_cast<int>(CVPixelBufferGetHeight(pixelBuffer));
  CVOpenGLESTextureRef texture = nil;
  auto caps = GLCaps::Get(context);
  const auto& format = caps->getTextureFormat(pixelFormat);
  // The returned texture object has a strong reference count of 1.
  CVReturn result = CVOpenGLESTextureCacheCreateTextureFromImage(
      kCFAllocatorDefault, textureCache, pixelBuffer, NULL,             /* texture attributes */
      GL_TEXTURE_2D, static_cast<GLint>(format.internalFormatTexImage), /* opengl format */
      width, height, format.externalFormat,                             /* native iOS format */
      GL_UNSIGNED_BYTE, 0, &texture);
  if (result != kCVReturnSuccess && texture != nil) {
    CFRelease(texture);
    texture = nil;
  }
  return texture;
}

std::shared_ptr<EAGLHardwareTexture> EAGLHardwareTexture::MakeFrom(Context* context,
                                                                   CVPixelBufferRef pixelBuffer) {
  std::shared_ptr<EAGLHardwareTexture> glTexture = nullptr;
  BytesKey recycleKey = {};
  ComputeRecycleKey(&recycleKey, pixelBuffer);
  glTexture = Resource::FindRecycled<EAGLHardwareTexture>(context, recycleKey);
  if (glTexture) {
    return glTexture;
  }
  auto eaglDevice = static_cast<EAGLDevice*>(context->device());
  if (eaglDevice == nullptr) {
    return nullptr;
  }

  auto format = CVPixelBufferGetPixelFormatType(pixelBuffer) == kCVPixelFormatType_OneComponent8
                    ? PixelFormat::ALPHA_8
                    : PixelFormat::BGRA_8888;
  auto texture = GetTextureRef(context, pixelBuffer, format, eaglDevice->getTextureCache());
  if (texture == nil) {
    return nullptr;
  }
  auto sampler = std::make_unique<GLSampler>();
  sampler->format = format;
  sampler->target = CVOpenGLESTextureGetTarget(texture);
  sampler->id = CVOpenGLESTextureGetName(texture);
  glTexture = Resource::AddToCache(context, new EAGLHardwareTexture(pixelBuffer), recycleKey);
  glTexture->sampler = std::move(sampler);
  glTexture->texture = texture;
  return glTexture;
}

void EAGLHardwareTexture::ComputeRecycleKey(BytesKey* recycleKey, CVPixelBufferRef pixelBuffer) {
  static const uint32_t HardwareType = UniqueID::Next();
  recycleKey->write(HardwareType);
  // 这里可以直接用指针做为 key 是因为缓存的 holder 会持有 CVPixelBuffer，只要 holder
  // 缓存存在，对应的 CVPixelBuffer
  // 指针就是有效的，不会出现指针地址被其他新创建对象占用的情况。其他情况下应该避免使用指针做 key。
  recycleKey->write(pixelBuffer);
}

EAGLHardwareTexture::EAGLHardwareTexture(CVPixelBufferRef pixelBuffer)
    : Texture(static_cast<int>(CVPixelBufferGetWidth(pixelBuffer)),
              static_cast<int>(CVPixelBufferGetHeight(pixelBuffer)), ImageOrigin::TopLeft),
      pixelBuffer(pixelBuffer) {
  CFRetain(pixelBuffer);
}

EAGLHardwareTexture::~EAGLHardwareTexture() {
  CFRelease(pixelBuffer);
  if (texture) {
    CFRelease(texture);
  }
}

size_t EAGLHardwareTexture::memoryUsage() const {
  return CVPixelBufferGetDataSize(pixelBuffer);
}

void EAGLHardwareTexture::onReleaseGPU() {
  if (texture == nil) {
    return;
  }
  static_cast<EAGLDevice*>(context->device())->releaseTexture(texture);
  texture = nil;
}
}  // namespace tgfx
