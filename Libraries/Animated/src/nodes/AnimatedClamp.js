/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule AnimatedClamp
 * @flow
 * @format
 */
'use strict';

const AnimatedInterpolation = require('./AnimatedInterpolation');
const AnimatedNode = require('./AnimatedNode');
const AnimatedValue = require('./AnimatedValue');
const AnimatedWithChildren = require('./AnimatedWithChildren');

import type {InterpolationConfigType} from './AnimatedInterpolation';

class AnimatedClamp extends AnimatedWithChildren {
  _a: AnimatedNode;
  _min: AnimatedNode;
  _max: AnimatedNode;

  constructor(a: AnimatedNode, min: AnimatedNode | number, max: AnimatedNode | number) {
    super();

    this._a = a;
    this._min = typeof min === 'number' ? new AnimatedValue(min) : min;
    this._max = typeof max === 'number' ? new AnimatedValue(max) : max;
  }

  __makeNative() {
    this._a.__makeNative();
    this._min.__makeNative();
    this._max.__makeNative();
    super.__makeNative();
  }

  interpolate(config: InterpolationConfigType): AnimatedInterpolation {
    return new AnimatedInterpolation(this, config);
  }

  __getValue(): number {
    return Math.min(Math.max(this._a.__getValue(), this._min.__getValue()), this._max.__getValue());
  }

  __attach(): void {
    this._a.__addChild(this);
    this._min.__addChild(this);
    this._max.__addChild(this);
  }

  __detach(): void {
    this._a.__removeChild(this);
    this._min.__removeChild(this);
    this._max.__removeChild(this);
    super.__detach();
  }

  __getNativeConfig(): any {
    return {
      type: 'clamp',
      input: this._a.__getNativeTag(),
      min: this._min.__getNativeTag(),
      max: this._max.__getNativeTag(),
    };
  }
}

module.exports = AnimatedClamp;
