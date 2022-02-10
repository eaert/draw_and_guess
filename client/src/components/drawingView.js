import { Text, View, Button } from 'react-native';
import React, { useState, useEffect } from "react";
import CanvasDraw from "react-canvas-draw";

export default function DrawingView() {
  const [canvas, setCanvas] = useState();

  const sendDrawing = async (value) => {
    try {
      console.log(canvas.getSaveData())
      console.log('test')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View>
      <CanvasDraw
        style={{
          boxShadow:
            "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)"
        }} ref={canvasDraw => (setCanvas(canvasDraw))}
      />
      <Button title='Finish' onPress={sendDrawing}></Button>
    </View>
  );
}

