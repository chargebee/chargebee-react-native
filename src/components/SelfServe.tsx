import React, { Component } from 'react';
import { debounce } from 'lodash';
import URL_LISTENER from '../utils/UrlListener';
import WebView from 'react-native-webview';
import { ActivityIndicator, View } from 'react-native';
import { CBSelfServeProps } from '../interfaces/cb-types';
import { CBSelfServe } from '../models/CBSelfServe';
import { StepHandler } from '../helpers/StepHandler';
import { styles } from '../styles/Styles';

type PortalState = {
  isLoading: boolean;
  portalUrl: string;
};

export class SelfServe extends Component<CBSelfServeProps, PortalState> {
  constructor(props: CBSelfServeProps) {
    super(props);
    this.state = {
      isLoading: true,
      portalUrl: new CBSelfServe(this.props).build(),
    };
  }

  render() {
    console.log('Url: ' + this.state.portalUrl);
    return (
      <View style={styles.wrapper}>
        <WebView
          scalesPageToFit={true}
          originWhitelist={['*']}
          source={{ uri: this.state.portalUrl }}
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
