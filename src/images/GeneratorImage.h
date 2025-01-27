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

#pragma once

#include "RasterImage.h"

namespace tgfx {
/**
 * GeneratorImage wraps an ImageGenerator that can generate ImageBuffers on demand.
 */
class GeneratorImage : public RasterImage {
 public:
  static std::shared_ptr<Image> MakeFrom(std::shared_ptr<ImageGenerator> generator,
                                         bool mipMapped = false);

  int width() const override {
    return generator->width();
  }

  int height() const override {
    return generator->height();
  }

  bool hasMipmaps() const override {
    return mipMapped;
  }

  bool isAlphaOnly() const override {
    return generator->isAlphaOnly();
  }

  bool isLazyGenerated() const override {
    return true;
  }

 protected:
  std::shared_ptr<Image> onMakeDecoded(Context* context) const override;

  std::shared_ptr<Image> onMakeMipMapped() const override;

  std::shared_ptr<TextureProxy> onLockTextureProxy(Context* context,
                                                   uint32_t renderFlags) const override;

 protected:
  std::shared_ptr<ImageGenerator> generator = nullptr;
  bool mipMapped = false;

  GeneratorImage(ResourceKey resourceKey, std::shared_ptr<ImageGenerator> generator,
                 bool mipMapped = false);
};
}  // namespace tgfx
