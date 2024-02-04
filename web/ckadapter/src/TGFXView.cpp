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
#include "tgfx/core/PathTypes.h"
#include "tgfx/core/Point.h"
#include "tgfx/core/Rect.h"
#include "tgfx/core/Stroke.h"
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

  enum_<LineCap>("StrokeCap")
      .value("Butt", LineCap::Butt)
      .value("Round", LineCap::Round)
      .value("Square", LineCap::Square);

  enum_<LineJoin>("StrokeJoin")
      .value("Bevel", LineJoin::Bevel)
      .value("Miter", LineJoin::Miter)
      .value("Round", LineJoin::Round);

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
      .function("setColor", &Paint::setColor, allow_raw_pointers())
      .function("getAlpha", &Paint::getAlpha)
      .function("setAlpha", &Paint::setAlpha)
      .function("setAlphaf", &Paint::setAlpha)
      .function("getStrokeCap", &Paint::getLineCap)
      .function("setStrokeCap", &Paint::setLineCap)
      .function("getStrokeJoin", &Paint::getLineJoin)
      .function("setStrokeJoin", &Paint::setLineJoin)
      .function("getStrokeWidth", &Paint::getStrokeWidth)
      .function("setStrokeWidth", &Paint::setStrokeWidth)
      .function("getStrokeMiter", &Paint::getMiterLimit)
      .function("setStrokeMiter", &Paint::setMiterLimit);

  class_<Path>("Path")
      .constructor<>()
      .function("getFillType", &Path::getFillType)
      .function("setFillType", &Path::setFillType)
      .function("getBounds", &Path::getBounds)
      .function("isEmpty", &Path::isEmpty)
      .function("equals", optional_override([](const Path& a, const Path& b) { return a == b; }))
      .function("contains", select_overload<bool(float, float) const>(&Path::contains))
      .function("moveTo", select_overload<void(float, float)>(&Path::moveTo))
      .function("moveToPoint", select_overload<void(const Point&)>(&Path::moveTo))
      .function("lineTo", select_overload<void(float, float)>(&Path::lineTo))
      .function("lineToPoint", select_overload<void(const Point&)>(&Path::lineTo))
      .function("quadTo", select_overload<void(float, float, float, float)>(&Path::quadTo))
      .function("quadToPoint", select_overload<void(const Point&, const Point&)>(&Path::quadTo))
      .function("cubicTo",
                select_overload<void(float, float, float, float, float, float)>(&Path::cubicTo))
      .function("cubicToPoint",
                select_overload<void(const Point&, const Point&, const Point&)>(&Path::cubicTo))
      .function("close", &Path::close)
      .function("addRect", select_overload<void(const Rect&, bool, unsigned)>(&Path::addRect))
      .function("addRectFloat",
                select_overload<void(float, float, float, float, bool, unsigned)>(&Path::addRect))
      .function("addOval", select_overload<void(const Rect&, bool, unsigned)>(&Path::addOval))
      .function("addArc", &Path::addArc)
      .function("addRoundRect", select_overload<void(const Rect&, float, float, bool, unsigned)>(
                                    &Path::addRoundRect))
      .function("addPath", &Path::addPath)
      .function("reset", &Path::reset)
      .function("transform", &Path::transform)
      .function("reverse", &Path::reverse)
      // .function("decompose", &Path::decompose)
      .function("countPoints", &Path::countPoints)
      .function("countVerbs", &Path::countVerbs);

  enum_<PathOp>("PathOp")
      // .value("ReverseDifference", "TGFX Unsupport")
      .value("Append", PathOp::Append)
      .value("Difference", PathOp::Difference)
      .value("Intersect", PathOp::Intersect)
      .value("Union", PathOp::Union)
      .value("XOR", PathOp::XOR);

  enum_<PathFillType>("FillType")
      .value("Winding", PathFillType::Winding)
      .value("EvenOdd", PathFillType::EvenOdd)
      .value("InverseWinding", PathFillType::InverseWinding)
      .value("InverseEvenOdd", PathFillType::InverseEvenOdd);
}
