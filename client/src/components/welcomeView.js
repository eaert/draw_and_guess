import React from 'react';
import { SERVER_ADDRESS } from '../Constants';
import { Text, View, Button, StyleSheet } from 'react-native';
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
      <Text style={styles.titleText}>Welcome to Draw & Guess Game !</Text>
      <View style={styles.viewButton}>
        <Button title='Start Game' accessibilityLabel='Press to Start a new Game' onPress={startGame} color='#696969' style={styles.welcomeButton}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontFamily: "Cochin",
    fontSize: 30,
    fontWeight: "bold",
    paddingTop: '75px'
  },
  viewButton: {
    alignSelf: 'center',
    paddingTop: '50px',
    width: '100px',
    justifyContent: 'center', 
  },
  welcomeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    width: '5px'
  }
});
