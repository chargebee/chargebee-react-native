import 'react-native-gesture-handler';
import * as React from 'react';
// You can import from local files
// import AssetExample from './components/AssetExample';
// or any pure javascript modules available in npm
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Success from '../components/Success';
import Home from '../components/Home';
import Checkout from '../components/Checkout';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Checkout"
          component={Checkout}
          options={{ title: 'Checkout' }}
        />
        <Stack.Screen
          name="Success"
          component={Success}
          options={{ title: 'Success' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
