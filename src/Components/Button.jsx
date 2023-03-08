import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Button = ({ action, text, type = '' }) => {
  return (

    <TouchableOpacity style={[type == '' ? styles.container : styles.secondary]} onPress={action}>
      <Text style={type == '' ? styles.text : styles.secondaryText}>{text}</Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 100,
    backgroundColor: '#ffffff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20, 
    marginHorizontal: 20
  },
  text: {
    color: '#0778ff',
    fontWeight: 'bold'
  },
  secondary: {
    height: 50,
    width: 100,
    backgroundColor: 'red',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20
  }, 
  secondaryText: {
    color: 'white',
    fontWeight: 'bold'
  }
})