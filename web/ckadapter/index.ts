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
      const paint = new CanvasKit.Paint();
      paint.setColor(CanvasKit.Color4f(0.9, 0, 0, 1.0));
      paint.setStyle(CanvasKit.PaintStyle.Stroke);
      paint.setAntiAlias(true);
      // const rr = CanvasKit.RRectXY(CanvasKit.LTRBRect(10, 60, 210, 260), 25, 15);
      const w = 100; // size of rect
      const h = 60;
      let x = 10; // initial position of top left corner.
      let y = 60;
      let dirX = 1; // box is always moving at a constant speed in one of the four diagonal directions
      let dirY = 1;

      function drawFrame(canvas) {
        // boundary check
        if (x < 0 || x + w > 300) {
          dirX *= -1; // reverse x direction when hitting side walls
        }
        if (y < 0 || y + h > 300) {
          dirY *= -1; // reverse y direction when hitting top and bottom walls
        }
        // move
        x += dirX;
        y += dirY;

        canvas.clear(CanvasKit.WHITE);
        const rr = CanvasKit.RRectXY(
          CanvasKit.LTRBRect(x, y, x + w, y + h),
          25,
          15
        );
        canvas.drawRRect(rr, paint);
        surface!.requestAnimationFrame(drawFrame);
      }
      surface.requestAnimationFrame(drawFrame);
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
