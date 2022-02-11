import { Text, View } from 'react-native';
import { SERVER_ADDRESS } from '../Constants';
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import axios from "axios";

export default function WaitingDrawView() {
    const navigator = useNavigate()

    const isDrawingReady = async () => {
        try {
            var response = await axios.get(SERVER_ADDRESS+'/game/isDrawingReady')
            if (response.data) {
                navigator('/draw/Guesser')
            } else {
                console.log('Waiting..')
                return
            }
        }catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            isDrawingReady();
        }, 5000);
      
        return () => clearTimeout(timer);
    });

    return (
        <View>
            <Text>Waiting for opponnent Drawings</Text>
        </View>
    )
}
