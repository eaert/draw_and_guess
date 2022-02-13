import { View, Text, StyleSheet } from 'react-native'
import React, { useState, useEffect } from "react";
import { SERVER_ADDRESS } from '../Constants';
import axios from 'axios';

export default function LeaderboardView() {
    const [data, setData] = useState();

    const getLeaderboard = async () => {
        try {
            var response = await axios.get(SERVER_ADDRESS+'/game/leaderboard')
            setData(response.data.leaderboard)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getLeaderboard()
    }, [])

    return (
        <View style={{alignItems: 'center'}}>
            <View style={styles.titleView}>
                <Text style={styles.titleText}>Leaderboard</Text>
            </View>
            <View>
                <View style={styles.semiTitleView}>
                    <Text style={styles.semiTitleText}>Time</Text>
                </View>
                <View style={styles.gridView}>
                    <View>
                        <Text style={styles.columnText}>Word</Text>
                        { data && <Text style={styles.columnText}>{data.time.word}</Text>}
                    </View>
                    <View>
                    <Text style={styles.columnText}>Time</Text>
                        { data && <Text style={styles.columnText}>{data.time.time}</Text>}
                    </View>
                </View>
            </View>
            <View>
                <View style={styles.semiTitleView}>
                    <Text style={styles.semiTitleText}>Score</Text>
                </View>
                <View style={styles.gridView}>
                    <View>
                        <Text style={styles.columnText}>Room</Text>
                        { data && <Text style={styles.columnText}>{data.score.roomNumber}</Text>}
                    </View>
                    <View>
                        <Text style={styles.columnText}>Score</Text>
                        { data && <Text style={styles.columnText}>{data.score.score}</Text>}
                    </View>
                    <View>
                        <Text style={styles.columnText}>UpdateAt</Text>
                        { data && <Text style={styles.columnText}>{data.score.time}</Text>}
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    titleView: {
      width: '50%',
      height: '70px',
      backgroundColor: 'rgba(0, 168, 232, 0.6)',
      marginTop: '10px', 
      textAlign: 'center',
      borderRadius: 5,
      shadowRadius: 5
    },
    titleText: {
        fontFamily: "Cochin",
        fontSize: 30,
        fontWeight: "bold",
        paddingTop: '15px'
    },
    semiTitleView: {
        marginTop: '10px', 
    },
    semiTitleText: {
        fontFamily: "Cochin",
        fontSize: 25,
        fontWeight: "bold",
        paddingTop: '10px'
    },
    gridView: {
        width: '400px',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        shadowRadius: 5
    },
    rowView: {
        flex: 1,
        flexDirection: 'row',
    },
    columnText: {
        fontFamily: "Cochin",
        color: 'darkblue',
        fontSize: 20,
        fontWeight: "bold",
        paddingLeft: '10px'
    }
  });