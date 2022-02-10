import { Text, View, Button } from 'react-native';
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
    navigator('/draw/drawer')
  }

  useEffect(() => {
      getPlayWords();
  }, []);

  return (
    <View>
      <Text>Please choose a word according to its difficulty level</Text>
      <View>
        <View>
          <Text>Easy</Text>
          <Text>Medium</Text>
          <Text>Hard</Text>
        </View>
        { wordsObj && <View >
          <Button title={wordsObj.easy} onPress={() => wordChoosen(wordsObj.easy)}></Button>
          <Button title={wordsObj.medium} onPress={() => wordChoosen(wordsObj.medium)}></Button>
          <Button title={wordsObj.hard} onPress={() => wordChoosen(wordsObj.hard)}></Button>
        </View>}
      </View>
      <Button title='Pick Words' onPress={getPlayWords}></Button>
    </View>
  );
}
