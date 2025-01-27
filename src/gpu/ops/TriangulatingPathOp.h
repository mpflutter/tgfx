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

#include "DrawOp.h"
#include "gpu/GpuBuffer.h"
#include "tgfx/core/Path.h"

namespace tgfx {
class PathPaint;

class TriangulatingPathOp : public DrawOp {
 public:
  static std::unique_ptr<TriangulatingPathOp> Make(Color color, const Path& path,
                                                   const Rect& clipBounds,
                                                   const Matrix& localMatrix);

  TriangulatingPathOp(Color color, std::shared_ptr<GpuBufferProxy> buffer, const Rect& bounds,
                      const Matrix& viewMatrix = Matrix::I(),
                      const Matrix& localMatrix = Matrix::I());

  TriangulatingPathOp(Color color, Path path, const Rect& bounds,
                      const Matrix& viewMatrix = Matrix::I(),
                      const Matrix& localMatrix = Matrix::I());

  void prepare(Context* context) override;

  void execute(RenderPass* renderPass) override;

 private:
  DEFINE_OP_CLASS_ID

  bool onCombineIfPossible(Op* op) override;

  Color color = Color::Transparent();
  std::shared_ptr<GpuBufferProxy> bufferProxy = nullptr;
  std::vector<std::shared_ptr<PathPaint>> pathPaints = {};
  Matrix viewMatrix = Matrix::I();
  Matrix localMatrix = Matrix::I();
};
}  // namespace tgfx
