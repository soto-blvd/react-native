/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

package com.facebook.react.animated;

import com.facebook.react.bridge.JSApplicationCausedNativeException;
import com.facebook.react.bridge.ReadableMap;

/*package*/ class ClampAnimatedNode extends ValueAnimatedNode {
  private final NativeAnimatedNodesManager mNativeAnimatedNodesManager;
  private final int mInputNodeTag;
  private final int mMinTag;
  private final int mMaxTag;

  public ClampAnimatedNode(
    ReadableMap config,
    NativeAnimatedNodesManager nativeAnimatedNodesManager) {
    mNativeAnimatedNodesManager = nativeAnimatedNodesManager;
    mInputNodeTag = config.getInt("input");
    mMinTag = config.getInt("min");
    mMaxTag = config.getInt("max");
  }

  @Override
  public void update() {
    double value = getNodeValue(mInputNodeTag);
    double min = getNodeValue(mMinTag);
    double max = getNodeValue(mMaxTag);

    mValue = Math.min(Math.max(value, min), max);
  }

  private double getNodeValue(int tag) {
    AnimatedNode animatedNode = mNativeAnimatedNodesManager.getNodeById(tag);

    if (!(animatedNode instanceof ValueAnimatedNode)) {
      throw new JSApplicationCausedNativeException("Illegal node ID set as an input for " +
        "Animated.clamp node");
    }

    return ((ValueAnimatedNode) animatedNode).getValue();
  }
}
