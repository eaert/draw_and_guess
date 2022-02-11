import { Text, View, Button, StyleSheet } from 'react-native';
import { SERVER_ADDRESS } from '../Constants';
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import axios from "axios";

export default function ChoosingView() {
  const navigator = useNavigate()
  const [wordsObj, setWordsObj] = useState();

  const getPlayWords = async () => {
    try {
      var response = await axios.get(SERVER_ADDRESS+'/game/words')
      setWordsObj(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const wordChoosen = async (word) => {
    try {
      console.log(word)
      await axios.post(SERVER_ADDRESS+'/game/choosenWord', {word})
      navigator('/draw/drawer')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
      getPlayWords();
  }, []);

  return (
    <View style={styles.waitingView}>
      <Text style={styles.titleText}>Please choose a word according to its difficulty level</Text>
      { wordsObj && <View style={styles.waitingButtonsView}>
        <View>
          <Text style={styles.waitingText}>Easy</Text>
          <Button title={wordsObj.easy} onPress={() => wordChoosen({easy: wordsObj.easy})} color='#696969'></Button>
        </View>
        <View>
          <Text style={styles.waitingText}>Medium</Text>
          <Button title={wordsObj.medium} onPress={() => wordChoosen({medium: wordsObj.medium})} color='#696969'></Button>
        </View>
        <View>
          <Text style={styles.waitingText}>Hard</Text>
          <Button title={wordsObj.hard} onPress={() => wordChoosen({hard: wordsObj.hard})} color='#696969'></Button>
        </View>
      </View>}
      <View style={{paddingTop: '10px'}}>
        <Button title='Pick Words' onPress={getPlayWords} color='#282828'></Button>
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
  waitingView: {
    alignItems: 'center',
  },
  waitingButtonsView: {
    paddingTop: '10px',
    alignItems: 'center',
    width: '100px'
  },
  waitingText: {
    fontFamily: "Cochin",
    fontSize: 15,
    fontWeight: "bold",
  },
  chooseButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    width: '5px'
  },
  changeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    textDecorationColor: 'black',
    width: '5px'
  }
});
