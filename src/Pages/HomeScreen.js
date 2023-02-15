import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Card, Button } from '../Components'
import { useState } from 'react';

export default function App() {

    let words = ['Hello', 'World!', 'It is me', 'Goat', 'Class', 'Best']
    const [word, setWord] = useState(words[0])
    const [position, setPosition] = useState(1)

    let action = () => {
        setWord(words[position]);
        console.log(position)
        if (position >= words.length - 1) {
            setPosition(0)
        } else {
            setPosition(position + 1)
        }
    }
    return (
        <View style={styles.container}>
            <Card content={word} />
            <Button action={action} />
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
    }
});
