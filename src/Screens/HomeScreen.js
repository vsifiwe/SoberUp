import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Card, Button } from '../Components'
import { useState } from 'react';

export default function HomeScreen({ navigation }) {

    const [word, setWord] = useState('...')
    const [text, onChangeText] = React.useState('');

    let action = (word) => {
        setWord(word);
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Set a Goal</Text>
            <Text style={styles.subtitle}>I want to be alcohol-free for <Text>{word}</Text></Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => action('5 days')}>
                    <Text>5 Days</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => action('2 weeks')}>
                    <Text>2 Weeks</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => action('1 month')}>
                    <Text>1 Month</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.bottomButtomContainer}>
                <Button styles={styles.bottomButtom} action={() => navigation.navigate('Second', {'days': word})} text='Next' />
            </View>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#c6dcff',
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
        justifyContent: 'space-around'
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
        marginTop: 150
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: 250
    }
});
