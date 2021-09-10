import { StyleProp, StyleSheet } from 'react-native';

export const styles: StyleProp<any> = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 3,
    marginBottom: 5,
  },
  loaderStyle: { position: 'absolute', left: 0, right: 0, bottom: 0, top: 0 },
  wrapper: { flex: 1 },
});
