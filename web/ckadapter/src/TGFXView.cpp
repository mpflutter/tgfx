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

// void TGFXView::draw() {
//   return;
//   if (appHost->width() <= 0 || appHost->height() <= 0) {
//     return;
//   }
//   if (window == nullptr) {
//     window = tgfx::WebGLWindow::MakeFrom(canvasID);
//   }
//   if (window == nullptr) {
//     return;
//   }
//   auto device = window->getDevice();
//   auto context = device->lockContext();
//   if (context == nullptr) {
//     return;
//   }
//   auto surface = window->getSurface(context);
//   if (surface == nullptr) {
//     device->unlock();
//     return;
//   }
//   auto canvas = surface->getCanvas();
//   canvas->clear();
//   auto numDrawers = drawers::Drawer::Count() - 1;
//   auto index = (drawIndex % numDrawers) + 1;
//   auto drawer = drawers::Drawer::GetByName("GridBackground");
//   drawer->draw(canvas, appHost.get());
//   drawer = drawers::Drawer::GetByIndex(index);
//   drawer->draw(canvas, appHost.get());
//   surface->flush();
//   context->submit();
//   window->present(context);
//   device->unlock();
// }
}  // namespace ckadapter

using namespace ckadapter;
using namespace emscripten;
using namespace tgfx;

EMSCRIPTEN_BINDINGS(TGFXDemo) {
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
  class_<Canvas>("Canvas").smart_ptr<std::shared_ptr<Canvas>>("Canvas").function("drawRect",
                                                                                 &Canvas::drawRect);
  class_<Rect>("Rect")
      .constructor<>()
      .class_function("MakeEmpty", &Rect::MakeEmpty)
      .class_function("MakeWH", static_cast<Rect (*)(float, float)>(&Rect::MakeWH))
      .class_function("MakeWH", static_cast<Rect (*)(int, int)>(&Rect::MakeWH))
      .class_function("MakeLTRB", &Rect::MakeLTRB)
      .class_function("MakeXYWH",
                      static_cast<Rect (*)(float, float, float, float)>(&Rect::MakeXYWH))
      .class_function("MakeXYWH", static_cast<Rect (*)(int, int, int, int)>(&Rect::MakeXYWH))
      .property("left", &Rect::left)
      .property("top", &Rect::top)
      .property("right", &Rect::right)
      .property("bottom", &Rect::bottom);
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
}
