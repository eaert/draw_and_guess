import { Text, View, Button } from 'react-native';
import React from 'react';
import { Link } from 'react-router-dom';

export default function WelcomeView() {
  return (
    <View>
      <Text>Welcome to Draw & Guess Game !</Text>
      <Link to={"/wait"}>
        <Button title='Start Game' accessibilityLabel='Press to Start a new Game' />
      </Link>
    </View>
  );
}
