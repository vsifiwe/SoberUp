import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Card, Button } from '../Components'
import { useState } from 'react';

export default function MonitorScreen({ navigation, route }) {

    const [word, setWord] = useState('...')
    const [note, onChangeNote] = useState('');

    let action = (word) => {
        setWord(word);
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Did you achieve the goal today? {word}</Text>
            {
                word == 'Yes' ? <Text style={styles.subtitle}>Good Job!</Text> : word == 'No' ? <Text style={styles.subtitle}>Don't give up</Text> : <></>
            }
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => action('No')}>
                    <Text>No</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => action('Yes')}>
                    <Text>Yes</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>How did you feel?</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeNote}
                value={note}
                multiline
                placeholder="Try to describe your mood throughout the day, what was hard? or anything that you helped you achieve the goal"
            />

            <View style={styles.bottomButtomContainer}>
                <Button styles={styles.bottomButtom} action={() => navigation.navigate('Feedback', {'days': route.params.days, 'status': word, 'note': note})} text='Record' />
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
        marginVertical: 36
    },
    subtitle: {
        fontSize: 24,
        fontWeight: 'lighter',
        paddingHorizontal: 48,
        marginTop: -12,
        marginBottom: 24
    },
    buttonContainer: {
        flexDirection: 'row',
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
        marginTop: 100
    },
    input: {
        height: 200,
        borderWidth: 1,
        padding: 10,
        width: 300,
        textAlignVertical: 'top',
        borderRadius: 8
    }
});
