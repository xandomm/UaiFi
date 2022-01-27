//
//  SinalStrenght.m
//  UaiFi
//
//  Created by Alexandre on 24/01/22.
//

#include "SinalStrenght.h"
#import "React/RCTBridge.h"
#import <NetworkExtension/NetworkExtension.h>

@implementation RNWifi

@synthesize bridge = _bridge;

RCT_EXPORT_METHOD(getWifiList:(RCTResponseSenderBlock)callback) {
    NSMutableArray* result = [NSMutableArray new];
    for (NEHotspotNetwork *hotspotNetwork in [NEHotspotHelper supportedNetworkInterfaces]) {
        NSMutableDictionary* hotspot = [NSMutableDictionary new];
        hotspot[@"SSID"] = hotspotNetwork.SSID;
        hotspot[@"BSSID"] = hotspotNetwork.BSSID;
        hotspot[@"isSecure"] = @(hotspotNetwork.secure);
        hotspot[@"level"] = @(hotspotNetwork.signalStrength);
        [result addObject:hotspot];
    }
    return callback(@[[NSNull null], result]);
}
RCT_EXPORT_MODULE();
@end
