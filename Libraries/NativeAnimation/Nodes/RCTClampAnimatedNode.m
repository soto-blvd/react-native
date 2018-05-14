/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "RCTClampAnimatedNode.h"

@implementation RCTClampAnimatedNode
{
  NSNumber *_inputNodeTag;
  NSNumber *_minNodeTag;
  NSNumber *_maxNodeTag;
}

- (instancetype)initWithTag:(NSNumber *)tag
                     config:(NSDictionary<NSString *, id> *)config
{
  if (self = [super initWithTag:tag config:config]) {
    _inputNodeTag = config[@"input"];
    _minNodeTag = config[@"min"];
    _maxNodeTag = config[@"max"];
  }

  return self;
}

- (void)performUpdate
{
  [super performUpdate];

  RCTValueAnimatedNode *input = (RCTValueAnimatedNode *)[self.parentNodes objectForKey:_inputNodeTag];
  RCTValueAnimatedNode *min = (RCTValueAnimatedNode *)[self.parentNodes objectForKey:_minNodeTag];
  RCTValueAnimatedNode *max = (RCTValueAnimatedNode *)[self.parentNodes objectForKey:_maxNodeTag];

  if ([input isKindOfClass:[RCTValueAnimatedNode class]] &&
      [min isKindOfClass:[RCTValueAnimatedNode class]] &&
      [max isKindOfClass:[RCTValueAnimatedNode class]]) {
    self.value = MIN(MAX(input.value, min.value), max.value);
  }
}

@end
