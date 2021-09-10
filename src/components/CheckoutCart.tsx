import React, { Component } from 'react';
import { debounce } from 'lodash';
import URL_LISTENER from '../utils/UrlListener';
import WebView from 'react-native-webview';
import { ActivityIndicator, View } from 'react-native';
import { CBCheckoutProps } from '../interfaces/cb-types';
import { CBCheckout } from '../models/CBCheckout';
import { StepHandler } from '../helpers/StepHandler';
import { styles } from '../styles/Styles';

type CartState = {
  planUrl: string;
  isLoading: boolean;
};

export class CheckoutCart extends Component<CBCheckoutProps, CartState> {
  constructor(props: CBCheckoutProps) {
    super(props);
    this.state = {
      planUrl: new CBCheckout(this.props).build(),
      isLoading: true,
    };
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <WebView
          scalesPageToFit={true}
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
          renderLoading={() => this.showSpinner()}
          onLoadEnd={() => this.hideSpinner()}
          startInLoadingState={true}
          textZoom={100}
        />
      </View>
    );
  }

  private showSpinner() {
    return (
      <ActivityIndicator
        animating={this.state.isLoading}
        size={'large'}
        style={styles.loaderStyle}
      />
    );
  }

  hideSpinner() {
    this.setState({ isLoading: false });
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
