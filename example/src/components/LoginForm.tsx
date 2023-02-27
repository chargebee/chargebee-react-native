import React, { useState } from 'react';
import { Input, Button } from '@ui-kitten/components';

const LoginForm = ({ login }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <Input
        label="User ID"
        placeholder="Enter user ID"
        value={userId}
        onChangeText={(nextValue) => setUserId(nextValue)}
      />
      <Input
        label="Password"
        placeholder="Enter Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(nextValue) => setPassword(nextValue)}
      />
      <Button onPress={() => login(userId, password)}>Login</Button>
    </>
  );
};

export default LoginForm;
