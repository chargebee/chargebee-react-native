import { Button, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();
  return (
    <View>
      <Button
        title="Free - Early Bird Plan"
        onPress={() =>
          navigation.navigate('Checkout', {
            couponIds: ['cbdemo_earlybird'],
            planName: 'comics-box',
            site: 'honeycomics-v3-test',
          })
        }
      />

      <Button
        title="Paid Plan"
        onPress={() =>
          navigation.navigate('Checkout', {
            planName: 'comics-box',
            site: 'honeycomics-v3-test',
          })
        }
      />

      <Button
        title="Paid Plan - With Addons"
        onPress={() =>
          navigation.navigate('Checkout', {
            addons: [{ id: 'extra-comic-book', quantity: 2 }],
            planName: 'comics-box',
            site: 'honeycomics-v3-test',
          })
        }
      />

      <Button
        title="Billing Address Partly filled"
        onPress={() =>
          navigation.navigate('Checkout', {
            addons: [{ id: 'extra-comic-book', quantity: 3 }],
            billingAddress: {
              firstName: 'Ellie',
              lastName: 'Joel',
              company: 'Naughty Dog',
              city: 'Orlando',
              zip: '32824',
              stateCode: 'FL',
              country: 'US',
            },
            planName: 'comics-box',
            site: 'honeycomics-v3-test',
          })
        }
      />

      <Button
        title="With 3DS"
        onPress={() =>
          navigation.navigate('Checkout', {
            planName: 'cbdemo_scale',
            addons: [{ id: 'cbdemo_conciergesupport', quantity: 1 }],
            couponIds: ['cbdemo_holidays'],
            site: 'test-ashwin1-test',
          })
        }
      />

      <Button
        title="V3 without 3DS"
        onPress={() =>
          navigation.navigate('Checkout', {
            planName: 'cbdemo_scale',
            addons: [{ id: 'cbdemo_conciergesupport' }],
            couponIds: ['cbdemo_holidays'],
            site: 'test-ashwin2-test',
          })
        }
      />

      <Button
        title="V2 Single Page Checkout"
        onPress={() =>
          navigation.navigate('Checkout', {
            planName: 'cbdemo_scale',
            addons: [{ id: 'cbdemo_conciergesupport' }],
            couponIds: ['cbdemo_holidays'],
            site: 'test-ashwin4-test',
          })
        }
      />
    </View>
  );
}
