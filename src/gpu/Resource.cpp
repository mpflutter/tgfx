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

#include "gpu/Resource.h"

namespace tgfx {
void Resource::assignResourceKey(const ResourceKey& newKey) {
  if (newKey.empty()) {
    removeResourceKey();
    return;
  }
  if (newKey.domain() != resourceKey.domain()) {
    context->resourceCache()->changeResourceKey(this, newKey);
  }
}

void Resource::removeResourceKey() {
  if (!resourceKey.empty()) {
    context->resourceCache()->removeResourceKey(this);
  }
}

void Resource::release(bool releaseGPU) {
  if (releaseGPU) {
    onReleaseGPU();
  }
  context = nullptr;
  // Set the reference to nullptr, allowing the resource to be deleted immediately or later when the
  // last external reference is released.
  reference = nullptr;
}
}  // namespace tgfx