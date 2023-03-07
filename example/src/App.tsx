import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { default as theme } from './theme.json';

import Chargebee, {
  AuthenticationDetail, ChargebeeError
} from '@chargebee/react-native-chargebee';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ProductDetail from './screens/ProductDetailScreen';
import CoursesScreen from './screens/CoursesScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const site = 'site';
  const apiKey = 'apiKey';
  const iOsSdkKey = 'iOsSdkKey';
  const androidSdkKey = 'androidSdkKey';

  useEffect(() => {
    configure(site, apiKey, iOsSdkKey, androidSdkKey);
    console.debug('Configured Chargebee SDK');
  });

  return (
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: 'Login' }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Hello' }}
          />
          <Stack.Screen
            name="ProductDetail"
            component={ProductDetail}
            options={{ title: 'Product Detail' }}
          />
          <Stack.Screen
            name="Courses"
            component={CoursesScreen}
            options={{ title: 'Courses' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
}
async function configure(
  site: string,
  apiKey: string,
  iOsSdkKey: string,
  androidSdkKey: string
) {
  try {
    // TODO Implement in Android
    const configResult: AuthenticationDetail = await Chargebee.configure({
      site: site,
      publishableApiKey: apiKey,
      androidSdkKey: androidSdkKey,
      iOsSdkKey: iOsSdkKey,
    });  
    console.log('SDK Configuration complete:', configResult)
  } catch (error: ChargebeeError) {
    console.error('SDK Config failed', error)
    console.log('code', error.code)
    console.log('message', error.message)
    console.log('domain', error.domain)
    console.log('userInfo', error.userInfo)
  }
  
}

