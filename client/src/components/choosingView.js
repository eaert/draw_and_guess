import { Text, View, Button } from 'react-native';
import { SERVER_ADDRESS } from '../Constants';
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import axios from "axios";

export default function ChoosingView() {
  const navigator = useNavigate()
  const [wordsObj, setWordsObj] = useState();

  async function getPlayWords() {
    try {
      var response = await axios.get(SERVER_ADDRESS+'/game/words')
      setWordsObj(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  function wordChoosen() {
    navigator('/draw')
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
          <Button title={wordsObj.easy} onPress={wordChoosen}></Button>
          <Button title={wordsObj.medium} onPress={wordChoosen}></Button>
          <Button title={wordsObj.hard} onPress={wordChoosen}></Button>
        </View>}
      </View>
      <Button title='Pick Words' onPress={getPlayWords}></Button>
    </View>
  );
}
