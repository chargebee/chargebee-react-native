#import "ChargebeeReactNative.h"
#import <ChargebeeReactNative-Swift.h>

@implementation ChargebeeReactNative
RCT_EXPORT_MODULE()

RCT_REMAP_METHOD(configure,
                configureWithSite:(NSString *)site
                withPublishableApiKey:(NSString *)publishableApiKey
                withSdkKey:(NSString *)sdkKey)
{
    ChargebeeHelper* helper = [[ChargebeeHelper alloc] init];
    [helper configureWithSite:site apiKey:publishableApiKey sdkKey:sdkKey];
}

RCT_REMAP_METHOD(retrieveProductIdentifiers,
                 retrieveProductIdentifiersWithQueryParams:(NSDictionary *)queryParams
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    ChargebeeHelper* helper = [[ChargebeeHelper alloc] init];
    [helper retrieveProductIdentifiersWithQueryParams:queryParams resolver:resolve rejecter:reject];
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
