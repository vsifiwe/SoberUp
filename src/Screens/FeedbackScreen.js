import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button, TextInput, ImageBackground, ActivityIndicator } from 'react-native';
import { Card } from '../Components'
import { useState } from 'react';
import {
    ContributionGraph,
} from "react-native-chart-kit";
import { Dimensions } from "react-native";
import BouncingBalls from 'react-native-bouncing-ball'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function FeedbackScreen({ navigation, route }) {
    const [viewable, SetViewable] = useState(false);

    const [status, setStatus] = useState(route.params.status);
    const [commits, setCommits] = useState([]);
    const [note, onChangeNote] = useState(null);
    const [info, setInfo] = useState({ "days": 0 })
    const [loading, setLoading] = useState(false)
    const screenWidth = Dimensions.get("window").width;

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
        setLoading(true)
        getEmail().then(res => {
            setInfo(res)
            console.log(res)
            let data = {
                "phone": res.phone
            }
            axios.post("https://student-fund-receipt.onrender.com/sober/retrieve/", data).then(res => setCommits(res.data.data)).then(() => setLoading(false))
        })

    }, [])

    const chartConfig = {
        backgroundGradientFrom: "#c6dcff",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#c6dcff",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(12, 17, 166, ${opacity})`,
        useShadowColorFromDataset: false,
        // optional
    };

    let handleClick = (day) => {
        onChangeNote(day.note);
    }

    let changeViewable = () => {
        SetViewable(!viewable);
    }

    return (
        <View style={styles.container}>
            {
                loading ? <ActivityIndicator size="large" color="#0000ff" />
                    : <>
                        <Text style={styles.title}>Goal achieved for:</Text>
                        <Text style={styles.title}>1 of {info.days}</Text>
                        <Button title="View detailed" onPress={changeViewable} />

                        {
                            viewable ?
                                <>
                                    <ContributionGraph
                                        values={commits}
                                        endDate={new Date("2023-04-30")}
                                        numDays={25}
                                        width={screenWidth}
                                        height={300}
                                        gutterSize={10}
                                        squareSize={25}
                                        chartConfig={chartConfig}
                                        onDayPress={handleClick}
                                    />

                                    {
                                        note == null ? <Text style={styles.subtitle}>Click on a day to see details</Text> : note == '' ? <Text style={styles.subtitle}>There is no note for this day</Text> : <Text style={styles.subtitle}>{note}</Text>
                                    }
                                </> :
                                <ImageBackground style={styles.imageBackground} source={require('../images/background.jpg')}>
                                    <BouncingBalls
                                        amount={5}
                                        animationDuration={5000}
                                        minSpeed={30}
                                        maxSpeed={200}
                                        minSize={40}
                                        maxSize={100}
                                        style={{
                                            backgroundColor: '#CDFFCD'
                                        }}
                                    />
                                </ImageBackground>
                        }
                    </>
            }







            {/* <View style={styles.bottomButtomContainer}>
                <Button styles={styles.bottomButtom} action={() => navigation.navigate('Second', { 'days': word })} text='Record' />
            </View> */}
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
        marginVertical: 36
    },
    subtitle: {
        fontSize: 24,
        fontWeight: 'lighter',
        paddingHorizontal: 48,
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
    imageBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
