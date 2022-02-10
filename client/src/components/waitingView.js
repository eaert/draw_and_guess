import { Text, View } from 'react-native';
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
        navigator('/choosing')
      }
    } catch (error) {
      console.log(error)
    }
    if (timeLeft !== 30) {
      setTimeLeft(timeLeft+1)
    } else {
      timeOver()
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
    <View>
      <Text>{30 - timeLeft} Seconds Left To find an opponent</Text>
    </View>
  );
}
