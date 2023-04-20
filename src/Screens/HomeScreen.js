import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Button } from '../Components'
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function HomeScreen({ navigation }) {

    const [word, setWord] = useState('')
    const [visible, setVisible] = React.useState(false);

    let action = (word) => {
        setVisible(false);
        setWord(word);
    }

    const getEmail = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_email')
            // AsyncStorage.clear();
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.error(e)
            // error reading value
        }
    }

    React.useEffect(() => {
        getEmail().then(res => {
            if(res !=null){
                navigation.navigate('Monitor', { 'days': res.days })
            }
        })
    }, [])
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Set a Goal</Text>
            <Text style={styles.subtitle}>I want to be alcohol-free for <Text style={styles.accent}>{word} days</Text></Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => action('5')}>
                    <Text>5 Days</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => action('14')}>
                    <Text>2 Weeks</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => action('30')}>
                    <Text>1 Month</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => setVisible(!visible)}>
                    <Text>Other</Text>
                </TouchableOpacity>
            </View>
            {
                visible ? 
                <TextInput
                onChangeText={setWord}
                value={word}
                placeholder='Enter number of days'
                style={styles.input}
                ></TextInput> : <></>
            }

            <View style={styles.bottomButtomContainer}>
                <Button styles={styles.bottomButtom} action={() => navigation.navigate('Second', { 'days': word })} text='Next' />
            </View>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    },
    accent: {
        color: "#04b551",
        fontWeight: 'bold'
    }
});
