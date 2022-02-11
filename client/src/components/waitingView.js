import { Text, View, StyleSheet } from 'react-native';
import { SERVER_ADDRESS } from '../Constants';
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import axios from "axios";

export default function WaitingView() {
  const navigator = useNavigate()

  const timeOver = () => {
    navigator('/')
  }

  const calculateTimeLeft = async () => {
    try {
      var response = await axios.get(SERVER_ADDRESS+'/user/findOppnent')
      if (response.data.ready) {
        if (response.data.rule === 'Drawer') {
          navigator('/choosing')
        } else {
          navigator('/waitingRoom')
        }
      } else {
        if (timeLeft !== 30) {
          setTimeLeft(timeLeft+1)
        } else {
          timeOver()
        }
      }
    } catch (error) {
      console.log(error)
    }
  }


  const [timeLeft, setTimeLeft] = useState(0);  

  useEffect(() => {
    const timer = setTimeout(() => {
      calculateTimeLeft();
    }, 1000);
  
    return () => clearTimeout(timer);
  });

  return (
    <View style={styles.waitingView}>
      <Text style={styles.waitingText}>{30 - timeLeft} Seconds Left To find an opponent</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  waitingView: {
    paddingTop: '10px',
    alignItems: 'center'
  },
  waitingText: {
    fontFamily: "Cochin",
    fontSize: 30,
    fontWeight: "bold",
    paddingTop: '75px'
  }
});