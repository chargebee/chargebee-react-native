import React, { Component } from 'react';
import { debounce } from 'lodash';
import URL_LISTENER from '../utils/UrlListener';
import WebView from 'react-native-webview';
import { StyleProp, StyleSheet } from 'react-native';
import { CBCheckoutProps } from '../interfaces/cb-types';
import { CBCheckout } from '../models/CBCheckout';
import { StepHandler } from '../helpers/StepHandler';

type CartState = {
  planUrl: string;
};

export class CheckoutCart extends Component<CBCheckoutProps, CartState> {
  constructor(props: CBCheckoutProps) {
    super(props);
    this.state = {
      planUrl: new CBCheckout().build(this.props),
    };
  }

  render() {
    return (
      <WebView
        originWhitelist={['*']}
        source={{ uri: this.state.planUrl }}
        style={styles}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onNavigationStateChange={(navState) =>
          this.debouncedNavigationHandler(navState.url)
        }
        injectedJavaScript={URL_LISTENER}
        onMessage={({ nativeEvent }) => {
          if (nativeEvent.data === 'navigationStateChange') {
            this.debouncedNavigationHandler(nativeEvent.url);
          }
        }}
      />
    );
  }

  navigationHandler = (url: string) => {
    if (!url) {
      return;
    }
    if (url.includes('thankyou') || url.includes('thank_you')) {
      const parts = url.split('/');
      const hostedPageId = parts[parts.length - 2] || '';
      return this.props.success(hostedPageId);
    }
    const recognisedStepName = StepHandler.getStepName(url);
    if (recognisedStepName) {
      return this.props.step(recognisedStepName);
    }
  };

  // Android fires multiple url change requests for a single url. Debounce is added to handle that
  debouncedNavigationHandler = debounce(this.navigationHandler, 300);
}

const styles: StyleProp<any> = StyleSheet.create({
  container: {
    flex: 1,
  },
});
