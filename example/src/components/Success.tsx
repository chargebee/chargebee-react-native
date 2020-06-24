import * as React from 'react';
import { Button, Card, Paragraph, Text, Title } from 'react-native-paper';
import { StyleProp, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Success() {
  const navigation = useNavigation();
  const jumpToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View>
      <Card>
        <Card.Content>
          <Title style={styles.centerAlign}>Subscription Complete</Title>
          <Paragraph style={styles.centerAlign}>
            Thank you for purchasing
          </Paragraph>
        </Card.Content>
      </Card>
      <Text />
      <View style={styles.content}>
        <Button mode="contained" color="#02daaf" onPress={() => jumpToHome()}>
          Go to Home
        </Button>
      </View>
    </View>
  );
}

const styles: StyleProp<any> = StyleSheet.create({
  centerAlign: { textAlign: 'center' },
  content: { justifyContent: 'center', alignItems: 'center' },
});
