import { StyleSheet, ImageBackground, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import AcountPage from './HomeScreen/acount';
import CoursePage from './HomeScreen/course';
import ProjectPage from './HomeScreen/project';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();

const HomePage = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,


      }}
    >

      <Tab.Screen
        name="Home"
        component={CoursePage}
        options={{
          tabBarIcon: () => <FontAwesome name="home" size={24} color="black" />,
        }}
      />
      <Tab.Screen
        name="Project"
        component={ProjectPage}
        options={{
          tabBarIcon: () => (
            <Entypo name="code" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Acount"
        component={AcountPage}
        options={{
          tabBarIcon: () => (
            <FontAwesome name="user-circle-o" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>

  );
};

export default HomePage;

const styles = StyleSheet.create({
  contener: {
    flex: 1,
    backgroundColor: '#DDDD',
    //alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    padding: 100,
    borderRadius: 50
  },
  bar: {
    backgroundColor: '#DDD',
    padding: 20,
  },
  tabBarBackground: {
    backgroundColor: '#DDDD',
    height: 60,
  },
  padding: {
    height: 10,
    margin: 10
  },
});


///rgba(255,255,255,0.5)

/*
 tabBarStyle: {
          position: "absolute",
          backgroundColor: 'red',
          color:"blue",
          //elevation: 10, // Add elevation to make it stand out
        },

          tabBarBackground: () => (
          <View style={styles.tabBarBackground}>
            <BlurView tint="prominent" intensity={150} style={styles.bar} />
          </View>
        ), 
*/