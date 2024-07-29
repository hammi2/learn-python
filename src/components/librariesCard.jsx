import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ref, get, set } from 'firebase/database';
import { auth } from 'firebase/auth';

const LibrariesCard = ({ url, lib, des, videoUrl }) => {
    const navigation = useNavigation();
    const handleLibraryCompletion = async () => {
        const user = auth.currentUser;
        if (user) {
            const userRef = ref(database, `users/${user.uid}`);
            const snapshot = await get(userRef);
            if (snapshot.exists()) {
                const userData = snapshot.val();
                const newXP = (userData.xp || 0) + 10; // إضافة 10 نقاط للمكتبة
                await set(userRef, { ...userData, xp: newXP });
            }
        }
    };

    return (
        <TouchableOpacity
            style={styles.cardContainer}
            onPress={() => navigation.navigate('List', {
                title: lib,
                videoUrl,
                description: des
            })}
        >
            <Image style={styles.image} source={{ uri: url }} />
            <Text style={styles.title}>{lib}</Text>
            <Text style={styles.description}>{des}</Text>
        </TouchableOpacity>
    );
};

export default LibrariesCard;

const styles = StyleSheet.create({
    cardContainer: {
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: 20,
        alignItems: 'center',
        marginVertical: 10,
        padding: 15,
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 20,
        marginBottom: 10,
        resizeMode: 'cover',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#000000',
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        color: '#000000',
    },
});