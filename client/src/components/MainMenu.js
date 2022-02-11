import React from 'react'
import { View, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faTrophy } from '@fortawesome/fontawesome-free-solid'
import { Link } from "react-router-dom";
import '../css/MainMenu.css'

export default function MainMenu() {

  return (
    <View style={styles.mainMenuView}>
      <Link id="home" className="menuLink" to="/" style={styles.menuLink}>
        <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
        <span>Home</span>
      </Link>
      <Link id="Leaderboard" className="menuLink" to="/Leaderboard" style={styles.menuLink}>
        <FontAwesomeIcon icon={faTrophy}></FontAwesomeIcon>
        <span>Leaderboard</span>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  mainMenuView: {
    backgroundColor: 'grey',
    height: '30px',
    flexDirection: 'row'
  }
});