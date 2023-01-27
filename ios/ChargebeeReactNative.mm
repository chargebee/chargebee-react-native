#import "ChargebeeReactNative.h"
#import <ChargebeeReactNative-Swift.h>

@implementation ChargebeeReactNative
RCT_EXPORT_MODULE()

RCT_REMAP_METHOD(configure,
                configureWithSite:(NSString *)site
                withPublishableApiKey:(NSString *)publishableApiKey
                withSdkKey:(NSString *)sdkKey)
{
    [[[ChargebeeHelper alloc] init] configureWithSite:site apiKey:publishableApiKey];
}

// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeChargebeeReactNativeSpecJSI>(params);
}
#endif

@end
