import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { database } from '../../Fire';
import { ref, get, set } from 'firebase/database';
import { auth } from 'firebase/auth';

const ListCourse = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { libraryId, title, description, videoUrl } = route.params;
    const [library, setLibrary] = useState(null);

    useEffect(() => {
        fetchLibraryData();
    }, []);

    const fetchLibraryData = async () => {
        try {
            const libraryDataRef = ref(database, `libraries/${libraryId}`);
            const librarySnapshot = await get(libraryDataRef);
            if (librarySnapshot.exists()) {
                setLibrary(librarySnapshot.val());
            }
        } catch (error) {
            console.error('Error fetching library data:', error);
        }
    };

    const renderLessonItem = ({ item, index }) => (
        <TouchableOpacity
            style={styles.lessonItem}
            onPress={() => navigation.navigate('LessonVideoScreen', { lessons: library.cource, initialLessonIndex: index })}
        >
            <Text style={styles.lessonText}>{`${index + 1}. ${item.title}`}</Text>
        </TouchableOpacity>
    );

    const handleVideoCompletion = async () => {
        const user = auth.currentUser;
        if (user) {
            const userRef = ref(database, `users/${user.uid}`);
            const snapshot = await get(userRef);
            if (snapshot.exists()) {
                const userData = snapshot.val();
                const newXP = (userData.xp || 0) + 3; // إضافة 3 نقاط للدرس
                await set(userRef, { ...userData, xp: newXP });
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{title}</Text>
            {library && (
                <FlatList
                    data={library.cource}
                    renderItem={renderLessonItem}
                    keyExtractor={item => item._id}
                    contentContainerStyle={styles.listContainer}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    lessonItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    lessonText: {
        fontSize: 18,
    },
    listContainer: {
        paddingBottom: 16,
    },
});

export default ListCourse;