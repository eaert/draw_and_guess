import { Text, View, StyleSheet } from 'react-native';
import { SERVER_ADDRESS } from '../Constants';
import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from  'react-loader-spinner'
import axios from "axios";


export default function WaitingDrawView() {
    const navigator = useNavigate()

    const isDrawingReady = async () => {
        try {
            var response = await axios.get(SERVER_ADDRESS+'/game/isDrawingReady')
            if (response.data) {
                clearInterval(myInterval)
                navigator('/draw/Guesser')
            } else {
                console.log('Waiting..')
                return
            }
        }catch(error) {
            console.log(error)
        }
    }

    var myInterval = setInterval(() => {
        isDrawingReady()
    }, 5000);

    const unloadHandle = async () => {
        if (myInterval) {
            clearInterval(myInterval)
        }
    }

    useEffect(() => {
        window.addEventListener('unload', unloadHandle)
        return () => window.removeEventListener('unload', unloadHandle)
    })

    return (
        <View style={styles.waitingView}>
            <Text style={styles.waitingText}>Waiting for opponnent Drawings</Text>
            <ThreeDots color="#696969" height="100" width="100" />
        </View>
    )
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