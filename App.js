import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';  
import { HomeScreen, SecondScreen, MonitorScreen, FeedbackScreen } from './src/Screens'
import {decode, encode} from 'base-64'

if (!global.btoa) {
    global.btoa = encode;
}

if (!global.atob) {
    global.atob = decode;
}

const Stack = createNativeStackNavigator();

const options = { headerShown: false };

export default function App() {
  return (
    <NavigationContainer>
      {/* Rest of your app code */}
      <Stack.Navigator screenOptions={options}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Second" component={SecondScreen} />
        <Stack.Screen name="Monitor" component={MonitorScreen} />
        <Stack.Screen name="Feedback" component={FeedbackScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
