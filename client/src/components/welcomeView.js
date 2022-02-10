import React from 'react';
import { SERVER_ADDRESS } from '../Constants';
import { Text, View, Button } from 'react-native';
import { useNavigate } from 'react-router-dom';

import axios from "axios";

export default function WelcomeView() {
  const navigator = useNavigate()
  const startGame = async () => {
    try {
      await axios.post(SERVER_ADDRESS+'/user/join', )
      navigator('/wait')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View>
      <Text>Welcome to Draw & Guess Game !</Text>
      <Button title='Start Game' accessibilityLabel='Press to Start a new Game' onPress={startGame}/>
    </View>
  );
}
