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

import * as types from "../types/types";
import { TGFXBind } from "../lib/tgfx";
import CKAdapter from "./wasm/ckadapter";
import { Adapter } from "./adapter";

declare class TGFXView {
  public static MakeFrom: (selector: string) => TGFXView;
  public updateSize: (devicePixelRatio: number) => void;
  public draw: (drawIndex: number) => void;
}

let CKAdapterModule: types.TGFX = null!;
let tgfxView: TGFXView = null!;
let drawIndex: number = 0;
let resized: boolean = false;

function updateSize() {
  if (!tgfxView) {
    return;
  }
  resized = false;
  let canvas = document.getElementById("ckadapter") as HTMLCanvasElement;
  let container = document.getElementById("container") as HTMLDivElement;
  let screenRect = container.getBoundingClientRect();
  let scaleFactor = window.devicePixelRatio;
  canvas.width = screenRect.width * scaleFactor;
  canvas.height = screenRect.height * scaleFactor;
  canvas.style.width = screenRect.width + "px";
  canvas.style.height = screenRect.height + "px";
  tgfxView.updateSize(scaleFactor);
  tgfxView.draw(drawIndex);
}

const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

window.onload = async () => {
  CKAdapterModule = await CKAdapter({
    locateFile: (file: string) => "./wasm/" + file,
  })
    .then((module: types.TGFX) => {
      TGFXBind(module);
      return module;
    })
    .catch((error: any) => {
      console.error(error);
      throw new Error(
        "CKAdapter init failed. Please check the .wasm file path!."
      );
    });

  // CanvasKit Demo
  const CanvasKit = new Adapter(CKAdapterModule);
  const webGLContext = CanvasKit.GetWebGLContext(
    document.getElementById("ckadapter") as HTMLCanvasElement,
    {}
  );
  const grContext = CanvasKit.MakeGrContext(webGLContext);
  console.log("grContext", grContext);
  if (grContext) {
    const surface = CanvasKit.MakeOnScreenGLSurface(
      grContext,
      300,
      300,
      null!,
      undefined,
      undefined
    );
    console.log("surface", surface);
    if (surface) {
      const canvas = surface.getCanvas();
      console.log("canvas", canvas);
      const paint = new CanvasKit.Paint();
      paint.setStyle(CanvasKit.PaintStyle.Stroke);
      paint.setStrokeWidth(20);
      paint.setStrokeMiter(4);
      paint.setStrokeCap(CanvasKit.StrokeCap.Round);
      paint.setStrokeJoin(CanvasKit.StrokeJoin.Round);
      // const color = CanvasKit.Color(255, 0, 0, 255);
      const color = CanvasKit.CYAN;
      paint.setColor(color);
      console.log("paint", paint, "color", color);
      // const rrect = CanvasKit.RRectXY(
      //   CanvasKit.XYWHRect(44, 44, 100, 100),
      //   26,
      //   26
      // );
      // canvas.drawRRect(rrect, paint);
      const path = new CanvasKit.Path();
      path.moveTo(44, 44);
      path.lineTo(144, 144);
      path.cubicTo(144, 144, 88, 88, 200, 200);
      path.lineTo(44, 144);
      path.close();

      const circlePath = new CanvasKit.Path();
      circlePath.addCircle(188, 188, 88);
      path.addPath(circlePath);

      const ovalPath = new CanvasKit.Path();
      ovalPath.addOval(CanvasKit.XYWHRect(166, 166, 120, 44));
      path.addPath(ovalPath);

      canvas.drawPath(path, paint);

      console.log("isEmpty", path.isEmpty());
      console.log("path.contains(44, 44)", path.contains(44, 44));
      console.log("path.getBounds", path.getBounds());

      // canvas.drawPath(ovalPath, paint);
      surface.flush();

      // setTimeout(() => {
      //   const paint = new CanvasKit.Paint();
      //   paint.setStyle(CanvasKit.PaintStyle.Fill);
      //   const color = CanvasKit.Color(255, 255, 0, 255);
      //   paint.setColor(color);
      //   console.log("paint", paint, "color", color);
      //   const rect = CanvasKit.XYWHRect(44, 144, 22, 22);
      //   console.log("rect", rect);
      //   canvas.drawRect(rect, paint);
      //   const rect2 = CanvasKit.XYWHRect(44, 44, 100, 100);
      //   // console.log("rect", rect);
      //   canvas.drawRect(rect, paint);
      //   canvas.drawRect(rect2, paint);
      //   surface.flush();
      // }, 2000);
    }
  }
  //   let image = await loadImage("../../resources/assets/bridge.jpg");
  //   tgfxView = CKAdapterModule.TGFXView.MakeFrom("#ckadapter", image);
  //   updateSize();
};

window.onresize = () => {
  if (resized) {
    return;
  }
  resized = true;
  window.setTimeout(updateSize, 300);
};

window.onclick = () => {
  if (!tgfxView) {
    return;
  }
  drawIndex++;
  tgfxView.draw(drawIndex);
};
