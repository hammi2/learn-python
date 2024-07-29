import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { auth, database } from '../../Fire'; // تأكد من مسار الاستيراد صحيح
import { ref, onValue, push, remove } from 'firebase/database';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { MaterialIcons } from '@expo/vector-icons';
import FastImage from 'react-native-fast-image'; // تأكد من تثبيت react-native-fast-image


const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const messagesRef = ref(database, 'messages');
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const fetchedMessages = [];
      snapshot.forEach((childSnapshot) => {
        const message = childSnapshot.val();
        fetchedMessages.push({ ...message, _id: childSnapshot.key });
      });
      setMessages(fetchedMessages.reverse());
    });

    return () => {
      // Cleanup the listener on component unmount
      unsubscribe();
    };
  }, []);

  const onSend = useCallback((newMessages = []) => {
    const messagesRef = ref(database, 'messages');
    const message = {
      ...newMessages[0],
      createdAt: new Date().toISOString(),
      user: {
        _id: auth.currentUser.uid,
        name: extractUsername(auth.currentUser.email),
        avatar: auth.currentUser.photoURL || null,
      },
    };
    push(messagesRef, message);
  }, []);

  const extractUsername = (email) => {
    if (!email || typeof email !== 'string') return 'User';
    const atIndex = email.indexOf('@');
    if (atIndex === -1) return 'User';
    return email.substring(0, atIndex);
  };

  const handleDelete = (_id) => {
    const messageRef = ref(database, `messages/${_id}`);
    remove(messageRef);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need media library permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.cancelled) {
      await uploadImage(result.uri);
    }
  };

  const uploadImage = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();

      const storage = getStorage();
      const storageReference = storageRef(storage, `images/${new Date().toISOString()}.jpg`);
      
      const snapshot = await uploadBytes(storageReference, blob);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      sendImageMessage(downloadURL);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    }
  };

  const sendImageMessage = (imageUrl) => {
    const messagesRef = ref(database, 'messages');
    const message = {
      createdAt: new Date().toISOString(),
      user: {
        _id: auth.currentUser.uid,
        name: extractUsername(auth.currentUser.email),
        avatar: auth.currentUser.photoURL || null,
      },
      image: imageUrl,
    };
    push(messagesRef, message);
  };

  const renderBubble = (props) => (
    <View style={styles.bubbleContainer}>
      <Bubble
        {...props}
        wrapperStyle={{
          right: { backgroundColor: '#0078fe' },
          left: { backgroundColor: '#e5e5ea' },
        }}
        textStyle={{
          right: { color: '#fff' },
          left: { color: '#000' },
        }}
        onLongPress={(context, message) => {
          if (message.user._id === auth.currentUser.uid) {
            Alert.alert(
              'Delete message',
              'Are you sure you want to delete this message?',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Delete',
                  style: 'destructive',
                  onPress: () => handleDelete(message._id),
                },
              ],
              { cancelable: true },
            );
          }
        }}
      />
      {props.currentMessage && props.currentMessage.user._id !== auth.currentUser.uid && (
        <Text style={styles.userName}>
          {props.currentMessage.user.name}
        </Text>
      )}
      {props.currentMessage.image && (
        <FastImage
          style={styles.image}
          source={{ uri: props.currentMessage.image }}
          resizeMode={FastImage.resizeMode.cover}
        />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: auth.currentUser.uid,
          name: extractUsername(auth.currentUser.email),
          avatar: auth.currentUser.photoURL || null,
        }}
        renderBubble={renderBubble}
        placeholder="Type your message here ..."
        onInputTextChanged={(text) => setIsTyping(text.length > 0)}
        renderActions={() => !isTyping && (
          <MaterialIcons
            name="insert-photo"
            size={28}
            color="#0078fe"
            style={styles.imageIcon}
            onPress={pickImage}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDD',
  },
  bubbleContainer: {
    marginBottom: 5,
  },
  userName: {
    fontSize: 12,
    color: '#888',
    textAlign: 'left',
    marginLeft: 10,
    marginTop: 2,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginTop: 5,
  },
  imageIcon: {
    marginLeft: 10,
    marginBottom: 10,
  },
});

export default ChatScreen;
