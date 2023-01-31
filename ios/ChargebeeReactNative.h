
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNChargebeeReactNativeSpec.h"

@interface ChargebeeReactNative : NSObject <NativeChargebeeReactNativeSpec>
#else
#import <React/RCTBridgeModule.h>

@interface ChargebeeReactNative : NSObject <RCTBridgeModule>
#endif

@end
