import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Button = ({action}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={action}>
      <Text style={styles.text}>Next</Text>
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
        marginVertical: 20 
    }, 
    text: {
        color: '#0778ff', 
        fontWeight: 'bold'
    }
})