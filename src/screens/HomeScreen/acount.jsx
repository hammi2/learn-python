import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, Linking } from 'react-native';
import { auth, database } from '../../../Fire';
import { ref, get } from 'firebase/database';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome6 } from '@expo/vector-icons';
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';

const AcountPage = () => {
  const extractUsername = (email) => {
    if (!email || typeof email !== 'string') return null;
    const atIndex = email.indexOf('@');
    if (atIndex === -1) return null;
    return email.substring(0, atIndex);
  };

  const email = auth.currentUser?.email;
  const username = extractUsername(email);
  const navigation = useNavigation();
  const [profilePicture, setProfilePicture] = useState(null);
  const [xp, setXp] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const profileRef = ref(database, 'users/' + user.uid);
        const snapshot = await get(profileRef);
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setProfilePicture(userData.profilePicture);
          setXp(userData.xp || 0); // جلب XP
        }
      }
    };

    fetchUserData();
  }, []);

  const logout = () => {
    Alert.alert(
      'Are you sure?',
      'You want to logout?',
      [
        { text: 'Cancel', onPress: () => console.log('Cancelled') },
        { text: 'OK', style: 'destructive', onPress: () => { auth.signOut(); navigation.navigate('Login'); } },
      ]
    );
  };

  const openDiscord = () => {
    Linking.openURL('https://discord.gg/nEtRPf3UWJ').catch((err) => console.error('Failed to open URL:', err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.barAcount}>
        {profilePicture ? (
          <Image source={{ uri: profilePicture }} style={styles.acountImage} />
        ) : (
          <Image source={require('../../../assets/icon.png')} style={styles.acountImage} />
        )}
        <Text style={styles.emailtext}>{auth.currentUser?.email}</Text>
        <TouchableOpacity style={styles.logouts} onPress={logout}>
          <Entypo name="log-out" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardText}>Username: {username}</Text>
        <Text style={styles.cardText}>XP: {xp}</Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.discordButton} onPress={openDiscord}>
          <FontAwesome6 name="discord" size={24} color="black" />
          <Text style={styles.buttonText}>Join Discord</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.chatButton} onPress={() => navigation.navigate('ChatScreen')}>
          <FontAwesome name="comments" size={30} color="#FFFFFF" />
          <Text style={styles.buttonText}>Chat Room</Text>
        </TouchableOpacity>
      </View>
      
      <StatusBar style="light" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#06024a',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  barAcount: {
    backgroundColor: 'rgba(26,32,162,0.99)',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    width: '95%',
    height: 100,
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  acountImage: {
    width: 70,
    height: 70,
    borderRadius: 40,
    marginLeft: -5,
    marginRight: 2,
  },
  emailtext: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginLeft: 10,
  },
  card: {
    width: '90%',
    height: 150,
    backgroundColor: '#F4F4F4',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Added elevation for shadow effect
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    paddingBottom: 10,
  },
  logout: {
    backgroundColor: '#FF0000',
    height: 50,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  textlogout: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  discordButton: {
    backgroundColor: '#7289DA',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
  },
  chatButton: {
    backgroundColor: '#0078fe',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 10,
  },
  logouts: {
    margin: 10,
    backgroundColor: "red",
    height: 35,
    width: 35,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AcountPage;