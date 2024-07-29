import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './src/screens/login';
import RegesterPage from './src/screens/regester';
import HomePage from './src/screens/home';
import ProjectScreen from "./src/components/ProjectScreen";
import CardProject from "./src/components/CardProject";
import ListCource from './src/components/ListCourse';
import LessonVideoScreen from './src/screens/LessonVideoScreen';
import ChatScreen from './src/screens/ChatScreen';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
        <Stack.Screen name="Regester" component={RegesterPage} />
        <Stack.Screen name="App" component={HomePage} />
        <Stack.Screen name="ProjectScreen" component={ProjectScreen} options={{ headerShown: true }} />
        <Stack.Screen name="List" component={ListCource} />
        <Stack.Screen name="CardProject" component={CardProject} />
        <Stack.Screen name="LessonVideoScreen" component={LessonVideoScreen} />
        <Stack.Screen  name='ChatScreen' component={ChatScreen} options={{ headerShown: true }}/>
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
// source={require("../../../assets/background.jpeg")}

// ID App : ecf182fc-0c62-4ea9-b78c-26ed47f5492f