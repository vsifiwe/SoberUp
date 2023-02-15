import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'

let device_width = Dimensions.get('window').width - 80;
let device_height = Dimensions.get('window').height / 5;

const Card = ({content}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{content}</Text>
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
    container: {
        height: device_height,
        width: device_width,
        alignItems: 'center',
        justifyContent: 'center', 
        borderRadius: 16, 
        backgroundColor: '#0778ff'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 32,
        color: 'white'
    }
})