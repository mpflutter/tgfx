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

#include "tgfx/core/Typeface.h"

namespace tgfx {
class ScalerContext {
 public:
  static std::shared_ptr<ScalerContext> Default();

  static std::shared_ptr<ScalerContext> Make(std::shared_ptr<Typeface> typeface, float size = 12.0f,
                                             bool fauxBold = false, bool fauxItalic = false);

  virtual ~ScalerContext() = default;

  std::shared_ptr<Typeface> getTypeface() const {
    return typeface;
  }

  float getSize() const {
    return size;
  }

  bool isFauxBold() const {
    return fauxBold;
  }

  bool isFauxItalic() const {
    return fauxItalic;
  }

  std::shared_ptr<ScalerContext> makeWithTypeface(std::shared_ptr<Typeface> newTypeface) const;

  std::shared_ptr<ScalerContext> makeWithSize(float newSize) const;

  std::shared_ptr<ScalerContext> makeWithFauxBold(bool newFauxBold) const;

  std::shared_ptr<ScalerContext> makeWithFauxItalic(bool newFauxItalic) const;

  virtual FontMetrics getMetrics() const = 0;

  virtual Rect getBounds(GlyphID glyphID) const = 0;

  virtual float getAdvance(GlyphID glyphID, bool verticalText = false) const = 0;

  virtual bool getPath(GlyphID glyphID, Path* path) const = 0;

  virtual std::shared_ptr<ImageBuffer> getGlyphImage(GlyphID glyphID, Matrix* matrix) const = 0;

  virtual Point getVerticalOffset(GlyphID glyphID) const = 0;

 protected:
  std::weak_ptr<ScalerContext> weakThis;
  std::shared_ptr<Typeface> typeface = nullptr;
  float size = 12.0f;
  bool fauxBold = false;
  bool fauxItalic = false;

  ScalerContext(std::shared_ptr<Typeface> typeface, float size, bool fauxBold, bool fauxItalic)
      : typeface(std::move(typeface)), size(size), fauxBold(fauxBold), fauxItalic(fauxItalic) {
  }

 private:
  static std::shared_ptr<ScalerContext> CreateNew(std::shared_ptr<Typeface> typeface, float size,
                                                  bool fauxBold, bool fauxItalic);
};
}  // namespace tgfx
