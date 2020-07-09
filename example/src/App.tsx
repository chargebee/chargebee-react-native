import * as React from 'react';
import AppNavigator from './navigation/AppNavigator';
// import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

// const theme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors,
//     primary: '#66afe9',
//   },
// };

export default function App() {
  return (
    // <PaperProvider theme={theme}>
    <AppNavigator />
    // </PaperProvider>
  );
}
