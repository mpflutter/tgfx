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

#include "SubsetImage.h"

namespace tgfx {
std::shared_ptr<Image> SubsetImage::MakeFrom(std::shared_ptr<Image> source, Orientation orientation,
                                             const Rect& bounds) {
  if (source == nullptr || bounds.isEmpty()) {
    return nullptr;
  }
  auto image =
      std::shared_ptr<SubsetImage>(new SubsetImage(std::move(source), orientation, bounds));
  image->weakThis = image;
  return image;
}

SubsetImage::SubsetImage(std::shared_ptr<Image> source, Orientation orientation, const Rect& bounds)
    : OrientedImage(std::move(source), orientation), bounds(bounds) {
}

std::shared_ptr<Image> SubsetImage::onCloneWith(std::shared_ptr<Image> newSource) const {
  return SubsetImage::MakeFrom(std::move(newSource), orientation, bounds);
}

std::shared_ptr<Image> SubsetImage::onMakeSubset(const Rect& subset) const {
  auto newBounds = subset.makeOffset(bounds.x(), bounds.y());
  return SubsetImage::MakeFrom(source, orientation, newBounds);
}

std::shared_ptr<Image> SubsetImage::onMakeOriented(Orientation orientation) const {
  auto newOrientation = concatOrientation(orientation);
  auto orientedWidth = OrientedImage::width();
  auto orientedHeight = OrientedImage::height();
  auto matrix = OrientationToMatrix(orientation, orientedWidth, orientedHeight);
  auto newBounds = matrix.mapRect(bounds);
  return SubsetImage::MakeFrom(source, newOrientation, newBounds);
}

MatrixAndClipResult SubsetImage::concatMatrixAndClip(const Matrix* localMatrix,
                                                     const Rect* clipBounds) const {
  std::optional<Matrix> matrix = std::nullopt;
  if (bounds.x() != 0 || bounds.y() != 0) {
    matrix = Matrix::MakeTrans(bounds.x(), bounds.y());
  }
  if (localMatrix != nullptr) {
    if (matrix) {
      matrix->preConcat(*localMatrix);
    } else {
      matrix = *localMatrix;
    }
  }
  auto clipRect = bounds;
  if (clipBounds != nullptr) {
    if (!clipRect.intersect(*clipBounds)) {
      clipRect.setEmpty();
    }
  }
  auto matrixResult = matrix ? std::addressof(*matrix) : nullptr;
  return OrientedImage::concatMatrixAndClip(matrixResult, &clipRect);
}
}  // namespace tgfx
