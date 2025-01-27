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

#include "ProxyProvider.h"
#include "gpu/DrawingManager.h"
#include "gpu/PlainTexture.h"
#include "gpu/proxies/TextureRenderTargetProxy.h"
#include "gpu/tasks/GpuBufferCreateTask.h"
#include "gpu/tasks/RenderTargetCreateTask.h"
#include "gpu/tasks/TextureCreateTask.h"

namespace tgfx {
ProxyProvider::ProxyProvider(Context* context) : context(context) {
}

bool ProxyProvider::hasResourceProxy(const ResourceKey& resourceKey) {
  auto proxy = findResourceProxy(resourceKey);
  if (proxy == nullptr) {
    return false;
  }
  return proxy->resourceKey.domain() == resourceKey.domain();
}

class DataWrapper : public DataProvider {
 public:
  DataWrapper(std::shared_ptr<Data> data) : data(std::move(data)) {
  }

  std::shared_ptr<Data> getData() const override {
    return data;
  }

 private:
  std::shared_ptr<Data> data = nullptr;
};

std::shared_ptr<GpuBufferProxy> ProxyProvider::createGpuBufferProxy(const ResourceKey& resourceKey,
                                                                    std::shared_ptr<Data> data,
                                                                    BufferType bufferType,
                                                                    uint32_t renderFlags) {
  if (data == nullptr || data->empty()) {
    return nullptr;
  }
  auto provider = std::make_shared<DataWrapper>(std::move(data));
  renderFlags |= RenderFlags::DisableAsyncTask;
  return createGpuBufferProxy(resourceKey, std::move(provider), bufferType, renderFlags);
}

std::shared_ptr<GpuBufferProxy> ProxyProvider::createGpuBufferProxy(
    const ResourceKey& resourceKey, std::shared_ptr<DataProvider> provider, BufferType bufferType,
    uint32_t renderFlags) {
  auto proxy = findGpuBufferProxy(resourceKey);
  if (proxy != nullptr) {
    return proxy;
  }
  auto strongKey = GetStrongKey(resourceKey, renderFlags);
  auto async = !(renderFlags & RenderFlags::DisableAsyncTask);
  auto task = GpuBufferCreateTask::MakeFrom(strongKey, bufferType, std::move(provider), async);
  if (task == nullptr) {
    return nullptr;
  }
  context->drawingManager()->addResourceTask(std::move(task));
  proxy = std::shared_ptr<GpuBufferProxy>(new GpuBufferProxy(bufferType));
  addResourceProxy(proxy, strongKey, resourceKey.domain());
  return proxy;
}

std::shared_ptr<TextureProxy> ProxyProvider::createTextureProxy(
    const ResourceKey& resourceKey, std::shared_ptr<ImageBuffer> imageBuffer, bool mipMapped,
    uint32_t renderFlags) {
  auto decoder = ImageDecoder::Wrap(std::move(imageBuffer));
  return createTextureProxy(resourceKey, std::move(decoder), mipMapped, renderFlags);
}

std::shared_ptr<TextureProxy> ProxyProvider::createTextureProxy(
    const ResourceKey& resourceKey, std::shared_ptr<ImageGenerator> generator, bool mipMapped,
    uint32_t renderFlags) {
  auto asyncDecoding = !(renderFlags & RenderFlags::DisableAsyncTask);
  auto decoder = ImageDecoder::MakeFrom(std::move(generator), !mipMapped, asyncDecoding);
  return createTextureProxy(resourceKey, std::move(decoder), mipMapped, renderFlags);
}

std::shared_ptr<TextureProxy> ProxyProvider::createTextureProxy(
    const ResourceKey& resourceKey, std::shared_ptr<ImageDecoder> decoder, bool mipMapped,
    uint32_t renderFlags) {
  auto proxy = findTextureProxy(resourceKey);
  if (proxy != nullptr) {
    return proxy;
  }
  auto strongKey = GetStrongKey(resourceKey, renderFlags);
  auto task = TextureCreateTask::MakeFrom(strongKey, decoder, mipMapped);
  if (task == nullptr) {
    return nullptr;
  }
  context->drawingManager()->addResourceTask(std::move(task));
  proxy = std::shared_ptr<TextureProxy>(
      new TextureProxy(decoder->width(), decoder->height(), mipMapped, decoder->isAlphaOnly()));
  addResourceProxy(proxy, strongKey, resourceKey.domain());
  return proxy;
}

std::shared_ptr<TextureProxy> ProxyProvider::createTextureProxy(const ResourceKey& resourceKey,
                                                                int width, int height,
                                                                PixelFormat format, bool mipMapped,
                                                                ImageOrigin origin,
                                                                uint32_t renderFlags) {
  auto proxy = findTextureProxy(resourceKey);
  if (proxy != nullptr) {
    return proxy;
  }
  if (!PlainTexture::CheckSizeAndFormat(context, width, height, format)) {
    return nullptr;
  }
  auto strongKey = GetStrongKey(resourceKey, renderFlags);
  auto task = TextureCreateTask::MakeFrom(strongKey, width, height, format, mipMapped, origin);
  if (task == nullptr) {
    return nullptr;
  }
  context->drawingManager()->addResourceTask(std::move(task));
  auto isAlphaOnly = format == PixelFormat::ALPHA_8;
  proxy = std::shared_ptr<TextureProxy>(
      new TextureProxy(width, height, mipMapped, isAlphaOnly, origin));
  addResourceProxy(proxy, strongKey, resourceKey.domain());
  return proxy;
}

std::shared_ptr<TextureProxy> ProxyProvider::wrapBackendTexture(
    const BackendTexture& backendTexture, ImageOrigin origin, bool adopted) {
  std::shared_ptr<Texture> texture = nullptr;
  if (adopted) {
    texture = Texture::MakeAdopted(context, backendTexture, origin);
  } else {
    texture = Texture::MakeFrom(context, backendTexture, origin);
  }
  if (texture == nullptr) {
    return nullptr;
  }
  auto strongKey = ResourceKey::NewStrong();
  texture->assignResourceKey(strongKey);
  auto proxy = std::shared_ptr<TextureProxy>(
      new TextureProxy(texture->width(), texture->height(), texture->hasMipmaps(),
                       texture->isAlphaOnly(), texture->origin(), !adopted));
  addResourceProxy(proxy, strongKey, strongKey.domain());
  return proxy;
}

std::shared_ptr<RenderTargetProxy> ProxyProvider::createRenderTargetProxy(
    std::shared_ptr<TextureProxy> textureProxy, PixelFormat format, int sampleCount) {
  if (textureProxy == nullptr) {
    return nullptr;
  }
  auto caps = context->caps();
  if (!caps->isFormatRenderable(format)) {
    return nullptr;
  }
  sampleCount = caps->getSampleCount(sampleCount, format);
  auto strongKey = ResourceKey::NewStrong();
  auto task =
      RenderTargetCreateTask::MakeFrom(strongKey, textureProxy->resourceKey, format, sampleCount);
  if (task == nullptr) {
    return nullptr;
  }
  context->drawingManager()->addResourceTask(std::move(task));
  auto proxy = std::shared_ptr<RenderTargetProxy>(
      new TextureRenderTargetProxy(std::move(textureProxy), format, sampleCount));
  addResourceProxy(proxy, strongKey, strongKey.domain());
  return proxy;
}

std::shared_ptr<RenderTargetProxy> ProxyProvider::wrapBackendRenderTarget(
    const BackendRenderTarget& backendRenderTarget, ImageOrigin origin) {
  auto renderTarget = RenderTarget::MakeFrom(context, backendRenderTarget, origin);
  if (renderTarget == nullptr) {
    return nullptr;
  }
  auto strongKey = ResourceKey::NewStrong();
  renderTarget->assignResourceKey(strongKey);
  auto proxy = std::shared_ptr<RenderTargetProxy>(
      new RenderTargetProxy(renderTarget->width(), renderTarget->height(), renderTarget->format(),
                            renderTarget->sampleCount(), renderTarget->origin()));
  addResourceProxy(proxy, strongKey, strongKey.domain());
  return proxy;
}

void ProxyProvider::purgeExpiredProxies() {
  std::vector<uint64_t> keys;
  for (auto& pair : proxyMap) {
    if (pair.second.expired()) {
      keys.push_back(pair.first);
    }
  }
  for (auto key : keys) {
    proxyMap.erase(key);
  }
}

ResourceKey ProxyProvider::GetStrongKey(const ResourceKey& resourceKey, uint32_t renderFlags) {
  if (resourceKey.empty() || renderFlags & RenderFlags::DisableCache) {
    // Disable cache, generate a temporary ResourceKey exclusively for proxy usage.
    return ResourceKey::NewStrong();
  }
  return resourceKey.makeStrong();
}

std::shared_ptr<GpuBufferProxy> ProxyProvider::findGpuBufferProxy(const ResourceKey& resourceKey) {
  auto proxy = std::static_pointer_cast<GpuBufferProxy>(findResourceProxy(resourceKey));
  if (proxy != nullptr) {
    return proxy;
  }
  auto gpuBuffer = Resource::Get<GpuBuffer>(context, resourceKey);
  if (gpuBuffer == nullptr) {
    return nullptr;
  }
  proxy = std::shared_ptr<GpuBufferProxy>(new GpuBufferProxy(gpuBuffer->bufferType()));
  addResourceProxy(proxy, resourceKey.makeStrong(), resourceKey.domain());
  return proxy;
}

std::shared_ptr<TextureProxy> ProxyProvider::findTextureProxy(const ResourceKey& resourceKey) {
  auto proxy = std::static_pointer_cast<TextureProxy>(findResourceProxy(resourceKey));
  if (proxy != nullptr) {
    return proxy;
  }
  auto texture = Resource::Get<Texture>(context, resourceKey);
  if (texture == nullptr) {
    return nullptr;
  }
  proxy = std::shared_ptr<TextureProxy>(
      new TextureProxy(texture->width(), texture->height(), texture->hasMipmaps(),
                       texture->isAlphaOnly(), texture->origin()));
  addResourceProxy(proxy, resourceKey.makeStrong(), resourceKey.domain());
  return proxy;
}

std::shared_ptr<ResourceProxy> ProxyProvider::findResourceProxy(const ResourceKey& resourceKey) {
  if (resourceKey.empty()) {
    return nullptr;
  }
  auto result = proxyMap.find(resourceKey.domain());
  if (result != proxyMap.end()) {
    auto proxy = result->second.lock();
    if (proxy != nullptr) {
      return proxy;
    }
    proxyMap.erase(result);
  }
  return nullptr;
}

void ProxyProvider::addResourceProxy(std::shared_ptr<ResourceProxy> proxy, ResourceKey strongKey,
                                     uint64_t domainID) {
  if (domainID == 0) {
    domainID = strongKey.domain();
  }
  proxy->context = context;
  proxy->resourceKey = std::move(strongKey);
  proxyMap[domainID] = std::move(proxy);
}

}  // namespace tgfx
