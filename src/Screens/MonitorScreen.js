import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Alert, Modal, Pressable } from 'react-native';
import { Button } from '../Components'
import { useState } from 'react';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function MonitorScreen({ navigation, route }) {

    const [word, setWord] = useState('...');
    const [email, setEmail] = useState('+250788427257');
    const [note, onChangeNote] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [info, setInfo] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [errorVisible, setErrorVisible] = useState(false)

    let action = (word) => {
        setWord(word);
    }


    const getEmail = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_email')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.error(e)
            // error reading value
        }
    }

    React.useEffect(() => {
        getEmail().then(res => setInfo(res))
    }, [])



    let handleSubmit = () => {
        let data = {
            "phone": info.phone,
            "status": true,
            "note": note
        }
        if (word == 'No') {
            data.status = false
        }
        setLoading(true)
        axios.post("https://student-fund-receipt.onrender.com/sober/record/", data)
            .then(res => {
                console.log(res.data)
                if (res.data.message == "You have already registered today") {
                    setError("You have already registered today");
                    setErrorVisible(true);
                }
            })
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
                        <Text style={styles.modalText}>Would you like to notify {email}?</Text>
                        <View style={styles.buttonsView}>
                            <Pressable
                                style={[styles.buttonModal]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}> Later </Text>
                            </Pressable>
                            <Pressable
                                style={[styles.buttonModal, styles.buttonClose]}
                                onPress={() => handleSubmit().then(() => setModalVisible(!modalVisible))}>
                                <Text style={styles.textStyle}> Notify </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={errorVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setErrorVisible(!errorVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{error}</Text>
                        <View style={styles.buttonsView}>
                            <Pressable
                                style={[styles.buttonModal]}
                                onPress={() => {
                                    setErrorVisible(!errorVisible)
                                    navigation.navigate('Feedback', { 'days': route.params.days, 'status': word, 'note': note })
                                }}>
                                <Text style={styles.textStyle}> Cancel </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>


            <Text style={styles.title}>Did you achieve the goal today? <Text style={styles.accent}>{word}</Text></Text>
            {
                word == 'Yes' ? <Text style={styles.subtitle}>Good Job!</Text> : word == 'No' ? <Text style={styles.subtitle}>Don't give up</Text> : <></>
            }
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => {
                    action('No');
                    getEmail().then(em => { console.log(em) }).then(() => setModalVisible(!modalVisible))
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
                {
                    loading ? <Button styles={styles.bottomButtom} action={() => handleSubmit()} loading={true} /> : <Button styles={styles.bottomButtom} action={() => handleSubmit()} text='Record' />
                }
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
        borderRadius: 8,
        backgroundColor: '#000',
        width: 80,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: '#2196F3',
        marginLeft: 5
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonsView: {
        flexDirection: 'row'
    },
    accent: {
        color: "#04b551",
        fontWeight: "bold"
    }
});
