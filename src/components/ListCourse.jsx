import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { useRoute } from '@react-navigation/native';

const ListCourse = () => {
    const route = useRoute();
    const { title, videoUrl, description } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>

            <View style={styles.video}>
                <YoutubePlayer
                    height={200}
                    width={350}
                    play={false}
                    videoId={videoUrl}
                    volume={60}
                />
            </View>
            <Text style={styles.desctitle}>Description : </Text>
            <Text style={styles.description}>{description}</Text>
        </View>
    );
};

export default ListCourse;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#06024a',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 10,
        marginTop: 30,
        marginHorizontal:30

    },
    video: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,
    },
    desctitle: {
        marginTop: 15,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#FFFFFF',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
});
