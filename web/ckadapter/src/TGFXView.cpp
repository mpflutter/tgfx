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

#include "TGFXView.h"
#include "tgfx/core/Canvas.h"
#include "tgfx/core/Color.h"
#include "tgfx/core/Paint.h"
#include "tgfx/core/Path.h"
#include "tgfx/core/Point.h"
#include "tgfx/core/Rect.h"
#include "tgfx/gpu/Surface.h"

namespace ckadapter {
TGFXView::TGFXView(std::string canvasID) : canvasID(std::move(canvasID)) {
  appHost = std::make_shared<drawers::AppHost>();
}

void TGFXView::createWindow() {
  if (appHost->width() <= 0 || appHost->height() <= 0) {
    return;
  }
  if (window == nullptr) {
    window = tgfx::WebGLWindow::MakeFrom(canvasID);
  }
}

std::shared_ptr<tgfx::Surface> TGFXView::getSurface() {
  auto device = window->getDevice();
  auto context = device->lockContext();
  if (context == nullptr) {
    return nullptr;
  }
  auto surface = window->getSurface(context);
  if (surface == nullptr) {
    device->unlock();
    return nullptr;
  }
  return surface;
}

void TGFXView::updateSize(float devicePixelRatio) {
  if (!canvasID.empty()) {
    int width = 0;
    int height = 0;
    emscripten_get_canvas_element_size(canvasID.c_str(), &width, &height);
    auto sizeChanged = appHost->updateScreen(width, height, devicePixelRatio);
    if (sizeChanged && window) {
      window->invalidSize();
    }
  }
}
}  // namespace ckadapter

using namespace ckadapter;
using namespace emscripten;
using namespace tgfx;

EMSCRIPTEN_BINDINGS(TGFXSKAdapter) {
  class_<TGFXView>("TGFXView")
      .smart_ptr<std::shared_ptr<TGFXView>>("TGFXView")
      .class_function("MakeFrom", optional_override([](const std::string& canvasID) {
                        if (canvasID.empty()) {
                          return std::shared_ptr<TGFXView>(nullptr);
                        }
                        return std::make_shared<TGFXView>(canvasID);
                      }))
      .function("createWindow", &TGFXView::createWindow)
      .function("getSurface", &TGFXView::getSurface)
      .function("updateSize", &TGFXView::updateSize);

  class_<Surface>("Surface")
      .smart_ptr<std::shared_ptr<Surface>>("Surface")
      .function("_getCanvas", &Surface::getCanvas, allow_raw_pointers())
      .function("_flushAndSubmit", &Surface::flushAndSubmit);

  class_<Canvas>("Canvas")
      .smart_ptr<std::shared_ptr<Canvas>>("Canvas")
      .function("drawRect", &Canvas::drawRect)
      .function("drawPath", &Canvas::drawPath);

  class_<Rect>("Rect")
      .constructor<>()
      .class_function("MakeEmpty", &Rect::MakeEmpty)
      .class_function("MakeWH", static_cast<Rect (*)(float, float)>(&Rect::MakeWH))
      .class_function("MakeWH", static_cast<Rect (*)(int, int)>(&Rect::MakeWH))
      .class_function("MakeLTRB",
                      static_cast<Rect (*)(float, float, float, float)>(&Rect::MakeLTRB))
      .class_function("MakeXYWH",
                      static_cast<Rect (*)(float, float, float, float)>(&Rect::MakeXYWH))
      .class_function("MakeXYWH", static_cast<Rect (*)(int, int, int, int)>(&Rect::MakeXYWH))
      .property("left", &Rect::left)
      .property("top", &Rect::top)
      .property("right", &Rect::right)
      .property("bottom", &Rect::bottom);

  class_<Point>("Point")
      .property("x", &Point::x)
      .property("y", &Point::y)
      .class_function("Zero", &Point::Zero)
      .class_function("Make", static_cast<Point (*)(float, float)>(&Point::Make))
      .class_function("Make", static_cast<Point (*)(int, int)>(&Point::Make));

  class_<RRect>("RRect").property("rect", &RRect::rect).property("radii", &RRect::radii);

  enum_<PaintStyle>("PaintStyle")
      .value("Fill", PaintStyle::Fill)
      .value("Stroke", PaintStyle::Stroke);

  class_<Color>("Color")
      .class_function("Transparent", &Color::Transparent, allow_raw_pointers())
      .class_function("Black", &Color::Black, allow_raw_pointers())
      .class_function("White", &Color::White, allow_raw_pointers())
      .class_function("FromRGBA", &Color::FromRGBA);

  class_<Paint>("Paint")
      .constructor<>()
      .function("reset", &Paint::reset)
      .function("getStyle", &Paint::getStyle)
      .function("setStyle", &Paint::setStyle)
      .function("getColor", &Paint::getColor, allow_raw_pointers())
      .function("setColor", &Paint::setColor, allow_raw_pointers());

  class_<Path>("Path")
      .constructor<>()
      .function("addRoundRect", &Path::addRoundRect)
      .function("reset", &Path::reset);
}
