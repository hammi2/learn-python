import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";
import { useRoute } from '@react-navigation/native';

const ProjectScreen = () => {
    const route = useRoute();
    const { title, urlId, description } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.video}>
                <YoutubePlayer
                    height={200}
                    width={350}
                    play={false}
                    videoId={urlId}
                    volume={60}
                />
            </View>
            <Text style={styles.desctitle}>Description</Text>
            <Text style={styles.description}>{description}</Text>
        </View>
    );
};

export default ProjectScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#06024a',
        //justifyContent: 'center',
        //alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 10,
    },
    video: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,
    },
    desctitle: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    description: {
        fontSize: 16,
        color: '#FFFFFF',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
});
