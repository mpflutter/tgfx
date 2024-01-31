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

#include "tgfx/core/Font.h"
#include "core/ScalerContext.h"

namespace tgfx {
Font::Font() : context(ScalerContext::Default()) {
}

Font::Font(std::shared_ptr<Typeface> typeface, float textSize)
    : context(ScalerContext::Make(std::move(typeface), textSize)) {
}

Font Font::makeWithSize(float newSize) const {
  return Font(context->makeWithSize(newSize));
}

std::shared_ptr<Typeface> Font::getTypeface() const {
  return context->getTypeface();
}

void Font::setTypeface(std::shared_ptr<Typeface> newTypeface) {
  context = context->makeWithTypeface(std::move(newTypeface));
}

float Font::getSize() const {
  return context->getSize();
}

void Font::setSize(float newSize) {
  context = context->makeWithSize(newSize);
}

bool Font::isFauxBold() const {
  return context->isFauxBold();
}

void Font::setFauxBold(bool value) {
  context = context->makeWithFauxBold(value);
}

bool Font::isFauxItalic() const {
  return context->isFauxItalic();
}

void Font::setFauxItalic(bool value) {
  context = context->makeWithFauxItalic(value);
}

FontMetrics Font::getMetrics() const {
  return context->getMetrics();
}

GlyphID Font::getGlyphID(const std::string& name) const {
  return context->getTypeface()->getGlyphID(name);
}

GlyphID Font::getGlyphID(Unichar unichar) const {
  return context->getTypeface()->getGlyphID(unichar);
}

Rect Font::getBounds(GlyphID glyphID) const {
  return context->getBounds(glyphID);
}

float Font::getAdvance(GlyphID glyphID, bool verticalText) const {
  return context->getAdvance(glyphID, verticalText);
}

bool Font::getPath(GlyphID glyphID, Path* path) const {
  return context->getPath(glyphID, path);
}

std::shared_ptr<ImageBuffer> Font::getGlyphImage(GlyphID glyphID, Matrix* matrix) const {
  return context->getGlyphImage(glyphID, matrix);
}

Point Font::getVerticalOffset(GlyphID glyphID) const {
  return context->getVerticalOffset(glyphID);
}

}  // namespace tgfx