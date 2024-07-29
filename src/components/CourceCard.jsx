import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const extractVideoId = (url) => {
    let videoId = null;
    const pattern = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(pattern);
    if (match && match[1]) {
        videoId = match[1];
    }
    return videoId;
};

const CourceCard = ({ id, title, url, description, videoUrl }) => {
    const navigation = useNavigation();
    const videoId = extractVideoId(videoUrl); // استخراج معرف الفيديو من الرابط

    return (
        <TouchableOpacity
            style={styles.cardContainer}
            onPress={() => navigation.navigate('List', {
                title,
                videoUrl, // إرسال معرف الفيديو بدلاً من الرابط الكامل
                description,
                id
            })}
        >
            <Image source={{ uri: url }} style={styles.courceImage} />
            
            <Text style={styles.title} numberOfLines={1}>  {id}# {title} </Text>
            {description && <Text style={styles.description} numberOfLines={2}>{description}</Text>}
        </TouchableOpacity>
    );
};

export default CourceCard;

const styles = StyleSheet.create({
    cardContainer: {
        width: 250, // ضبط عرض البطاقة ليكون مناسبًا
        height: 300, // ضبط ارتفاع البطاقة ليكون ثابتًا
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: 20,
        alignItems: 'center',
        marginVertical: 10,
        padding: 15,
    },
    cardNumber: {
        fontSize: 14,
        color: '#FFFFFF',
        marginBottom: 5,

    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#FFFFFF',
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        color: '#FFFFFF',
    },
    courceImage: {
        width: '100%',
        height: 150,
        borderRadius: 20,
        marginBottom: 10,
        resizeMode: 'cover',
    },
});