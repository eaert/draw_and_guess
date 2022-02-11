import { View, Button, TextInput, StyleSheet } from 'react-native';
import React, { useState } from "react";
import { SERVER_ADDRESS } from '../Constants';
import CanvasDraw from "react-canvas-draw";
import { useParams, useNavigate } from 'react-router-dom';
import { ThreeDots } from  'react-loader-spinner'

import axios from "axios";

export default function DrawingView() {
  const navigator = useNavigate()
  const params = useParams()
  const [canvas, setCanvas] = useState();
  const [guess, setGuess] = useState();
  const [sent, setSent] = useState(false);

  const setCanvasGame = async (canvasDraw) => {
    setCanvas(canvasDraw)
    if (params.role === 'Guesser') {
      load()
    }else {
      return
    }
  }

  const undoLast = async () => {
    canvas.undo()
  }

  const submit = async () => {
    try {
      if (params.role !== 'Guesser') {
        var toSave = canvas.getSaveData()
        await axios.post(SERVER_ADDRESS+'/game/saveDrawing', {
          drawing: toSave
        })
        setSent(true)
        await new Promise((resolve) => setTimeout(resolve,5000));
        navigator('/waitingRoom')
      } else {
        var toGuess = guess.value
        var response = await axios.post(SERVER_ADDRESS+'/game/guessWord', {
          guess: toGuess
        })
        if (response.data.isCurrect) {
          navigator('/choosing')
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const load = async () => {
    try {
      var response = await axios.get(SERVER_ADDRESS+'/game/loadDrawing')
      canvas.loadSaveData(response.data.drawing, false)
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.drawingView}>
      {!sent ? <CanvasDraw canvasWidth={window.innerWidth} canvasHeight={window.innerHeight*0.8}
        style={{
          boxShadow:
            "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)"
        }} ref={canvasDraw => (setCanvasGame(canvasDraw))}
      /> : <ThreeDots color="#696969" height="100" width="100" />}
      { params.role === 'Guesser' && <TextInput placeholder='test test test' ref={input => (setGuess(input))}></TextInput>}
      <View style={styles.drawingButtonsView}>
        <Button title='Undo' onPress={undoLast} color='#696969'></Button>
        <Button title='Submit' onPress={submit} color='#696969'></Button>
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
  drawingView: {
    alignItems: 'center',
  },
  drawingButtonsView: {
    paddingTop: '10px',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100px'
  },
});

 