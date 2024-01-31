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

#include "ScalerContext.h"
#include <mutex>
#include "tgfx/utils/BytesKey.h"

namespace tgfx {
static float ValidSize(float size) {
  if (size <= 0) {
    return 12.0f;
  }
}

static std::shared_ptr<Typeface> ValidTypeface(std::shared_ptr<Typeface> typeface) {
  if (typeface == nullptr) {
    return Typeface::MakeDefault();
  }
  return typeface;
}

std::shared_ptr<ScalerContext> ScalerContext::Default() {
  static auto context = Make(nullptr);
  return context;
}

std::shared_ptr<ScalerContext> ScalerContext::Make(std::shared_ptr<Typeface> typeface, float size,
                                                   bool fauxBold, bool fauxItalic) {
  typeface = ValidTypeface(typeface);
  size = ValidSize(size);
  BytesKey fontKey = {};
  fontKey.write(size);
  uint32_t flags = static_cast<uint32_t>(fauxBold) | (static_cast<uint32_t>(fauxItalic) << 1);
  fontKey.write(flags);
  std::lock_guard<std::mutex> lock(typeface->locker);
  auto& scalerCache = typeface->scalerCache;
  auto result = scalerCache.find(fontKey);
  if (result != scalerCache.end()) {
    auto context = result->second.lock();
    if (context != nullptr) {
      return context;
    }
  }
  auto context = CreateNew(typeface, size, fauxBold, fauxItalic);
  context->weakThis = context;
  scalerCache[fontKey] = context;
  return context;
}

std::shared_ptr<ScalerContext> ScalerContext::makeWithTypeface(
    std::shared_ptr<Typeface> newTypeface) const {
  newTypeface = ValidTypeface(newTypeface);
  if (newTypeface == typeface) {
    return weakThis.lock();
  }
  return Make(newTypeface, size, fauxBold, fauxItalic);
}

std::shared_ptr<ScalerContext> ScalerContext::makeWithSize(float newSize) const {
  newSize = ValidSize(newSize);
  if (newSize == size) {
    return weakThis.lock();
  }
  return Make(typeface, newSize, fauxBold, fauxItalic);
}

std::shared_ptr<ScalerContext> ScalerContext::makeWithFauxBold(bool newFauxBold) const {
  if (newFauxBold == fauxBold) {
    return weakThis.lock();
  }
  return Make(typeface, size, newFauxBold, fauxItalic);
}

std::shared_ptr<ScalerContext> ScalerContext::makeWithFauxItalic(bool newFauxItalic) const {
  if (newFauxItalic == fauxItalic) {
    return weakThis.lock();
  }
  return Make(typeface, size, fauxBold, newFauxItalic);
}

}  // namespace tgfx
