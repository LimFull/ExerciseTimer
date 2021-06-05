import React from 'react';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
  AdEventType,
} from '@react-native-firebase/admob';

const testBannerId = 'ca-app-pub-3940256099942544/6300978111';

export const BottomBannerAds = adBannerUnitId => (
  <BannerAd
    unitId={'ca-app-pub-7110380136138831/6154226410'}
    size={BannerAdSize.FULL_BANNER}
    requestOptions={{
      requestNonPersonalizedAdsOnly: true,
    }}
    onAdLoaded={() => {
      console.log('Advert loaded');
    }}
    onAdFailedToLoad={error => {
      console.error('Advert failed to load: ', error);
    }}
  />
);
