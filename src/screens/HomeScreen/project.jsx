import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TextInput } from 'react-native';
import CardProject from '../../components/CardProject';
import { useNavigation } from '@react-navigation/native';
import { database } from '../../../Fire';
import { ref, get, set } from 'firebase/database';
import { auth } from 'firebase/auth';

const ProjectPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [projectData, setProjectData] = useState([]);
    const [filteredProjectData, setFilteredProjectData] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        handleSearch(searchQuery);
    }, [searchQuery]);

    const fetchData = async () => {
        try {
            const projectDataRef = ref(database, 'projects');
            const projectSnapshot = await get(projectDataRef);
            if (projectSnapshot.exists()) {
                const data = projectSnapshot.val();
                setProjectData(data);
                setFilteredProjectData(data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSearch = (query) => {
        const lowerCaseQuery = query.toLowerCase();
        const filteredProjects = Object.values(projectData).filter(item =>
            item.title.toLowerCase().includes(lowerCaseQuery) ||
            item.description.toLowerCase().includes(lowerCaseQuery)
        );
        setFilteredProjectData(filteredProjects);
    };

    const handlePress = async (item) => {
        await handleProjectCompletion();
        navigation.navigate('ProjectScreen', item);
    };

    const handleProjectCompletion = async () => {
        const user = auth?.currentUser;
        if (user) {
            const userRef = ref(database, `users/${user.uid}`);
            const snapshot = await get(userRef);
            if (snapshot.exists()) {
                const userData = snapshot.val();
                const newXP = (userData.xp || 0) + 15; // إضافة 15 نقطة للمشروع
                await set(userRef, { ...userData, xp: newXP });
            }
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search ..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <FlatList
                data={filteredProjectData}
                renderItem={({ item }) => (
                    <CardProject
                        url={item.url}
                        title={item.title}
                        description={item.description}
                        urlId={item.urlId}
                        onPress={handlePress}
                    />
                )}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#06024a',
    },
    searchBar: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 8,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        marginTop: 20,
    },
});

export default ProjectPage;