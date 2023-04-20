import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Card, Button } from '../Components'
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function SecondScreen({ navigation, route }) {

    const [word, setWord] = useState('...')
    const [text, onChangeText] = React.useState('');

    let action = (word) => {
        let data = {
            'phone': text,
            'days': route.params.days
        }

        storeEmail(data).then(() => {
            axios.post("https://student-fund-receipt.onrender.com/sober/register/", data)
            .then(() => navigation.navigate('Monitor', { 'days': route.params.days }))
        })
    }

    const storeEmail = async (value) => {
        console.log("Trying to set email")
        try {

            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@storage_email', jsonValue)
        } catch (e) {
            // saving error
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Set a Goal</Text>
            <Text style={styles.subtitle}>I want to be alcohol-free for: <Text style={styles.accent}>{route.params.days} days</Text></Text>
            <Text style={styles.subtitle}>Who would you like to share your progress with?</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder="+250 788 123 123"
                keyboardType="phone-pad"
            />
            <View style={styles.bottomButtomContainer}>
                <Button action={() => navigation.navigate('Home')} text='Back' type='Secondary'></Button>
                {/* <Button action={() => storeEmail(text).then(() => navigation.navigate('Monitor', { 'days': route.params.days }))} text='Next' /> */}
                <Button action={action} text='Next' />
            </View>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#c6dcff',
        backgroundColor: '#dbdbdb',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 36,
        marginBottom: 72
    },
    subtitle: {
        fontSize: 24,
        fontWeight: 'lighter',
        paddingHorizontal: 48,
        marginBottom: 48
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 15,
        justifyContent: 'space-around',
        alignItems: 'space-around'
    },
    button: {
        width: 80,
        height: 40,
        borderWidth: 1,
        marginHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    bottomButtomContainer: {
        flexDirection: 'row',
        marginTop: 150
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: 250
    },
    accent: {
        color: "#04b551",
        fontWeight: "bold"
    }
});
