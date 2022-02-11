import { Text, View, Button, TextInput } from 'react-native';
import React, { useState, useEffect } from "react";
import { SERVER_ADDRESS } from '../Constants';
import CanvasDraw from "react-canvas-draw";
import { useParams, useNavigate } from 'react-router-dom';

import axios from "axios";

export default function DrawingView() {
  const params = useParams()
  const [canvas, setCanvas] = useState();
  const [guess, setGuess] = useState();

  const setCanvasGame = async (canvasDraw) => {
    setCanvas(canvasDraw)
    if (params.role === 'Guesser') {
      load()
    }else {
      console.log('Common draw something!')
    }
  }

  const submit = async () => {
    try {
      if (params.role !== 'Guesser') {
        var toSave = canvas.getSaveData()
        await axios.post(SERVER_ADDRESS+'/game/saveDrawing', {
          drawing: toSave
        })
      } else {
        var toGuess = guess.value
        var response = await axios.post(SERVER_ADDRESS+'/game/guessWord', {
          guess: toGuess
        })
        if (response.data.isCurrect) {
          
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const load = async () => {
    try {
      var response = await axios.get(SERVER_ADDRESS+'/game/loadDrawing')
      console.log(response.data)
      canvas.loadSaveData(response.data.drawing, false)
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <View>
      <CanvasDraw
        style={{
          boxShadow:
            "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)"
        }} ref={canvasDraw => (setCanvasGame(canvasDraw))}
      />
      { params.role === 'Guesser' && <TextInput placeholder='test test test' ref={input => (setGuess(input))}></TextInput>}
      <Button title='Submit' onPress={submit}></Button>
    </View>
  );
}

 