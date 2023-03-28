import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Alert, Modal, Pressable } from 'react-native';
import { Card, Button } from '../Components'
import { useState } from 'react';

export default function MonitorScreen({ navigation, route }) {

    const [word, setWord] = useState('...');
    const [email, setEmail] = useState('asifiwemanzi@gmail.com');
    const [note, onChangeNote] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    let action = (word) => {
        setWord(word);
    }


    const getEmail = async () => {
        try {

            const value = await AsyncStorage.getItem('@storage_email')
            if (value !== null) {
                // value previously stored
            }
        } catch (e) {
            // error reading value
        }
    }


    let handleSubmit = async () => {

    }
    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Would you like to talk to {email}</Text>
                        <Pressable
                            style={[styles.buttonModal, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}> Maybe later </Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Text style={styles.title}>Did you achieve the goal today? {word}</Text>
            {
                word == 'Yes' ? <Text style={styles.subtitle}>Good Job!</Text> : word == 'No' ? <Text style={styles.subtitle}>Don't give up</Text> : <></>
            }
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => {
                    action('No');
                    getEmail().then(em => {console.log(em)}).then(() => setModalVisible(!modalVisible))
                }}>
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
                <Button styles={styles.bottomButtom} action={() => navigation.navigate('Feedback', { 'days': route.params.days, 'status': word, 'note': note })} text='Record' />
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
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 70,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    buttonModal: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
