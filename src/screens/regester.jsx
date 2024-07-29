import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    Animated,
    Alert
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { auth, database } from '../../Fire';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';

const RegisterPage = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState('');

    const fedCardAnimation = useRef(new Animated.Value(0)).current;
    const fadeMouve = useRef(new Animated.ValueXY({ x: -550, y: 0 })).current;
    const inputAnimation = useRef(new Animated.Value(0)).current;

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('User signed up');

                // Save additional user data to the database
                set(ref(database, 'users/' + user.uid), {
                    email: email,
                    profilePicture: profilePicture
                });

                navigation.navigate('App');
            })
            .catch((error) => {
                const errorMessage = error.message;
                Alert.alert(
                    "Eroor Login Failed",
                    errorMessage
                )
                console.log(errorMessage);
            });
    }

    const cardAnimation = () => {
        Animated.sequence([
            Animated.timing(fedCardAnimation, {
                toValue: 2,
                duration: 1500,
                useNativeDriver: true
            }),
            Animated.sequence([
                Animated.timing(fadeMouve, {
                    toValue: { x: 0, y: 0 },
                    duration: 700,
                    useNativeDriver: true,
                    declarations: 0.3
                }),
                Animated.sequence([
                    Animated.timing(inputAnimation, {
                        toValue: 2,
                        duration: 1000,
                        useNativeDriver: true
                    })
                ])
            ])
        ]).start();
    };

    const InputAbimation = () => {
        Animated.sequence([
            Animated.timing(inputAnimation, {
                toValue: 2,
                duration: 2000,
                useNativeDriver: true
            })
        ]).start();
    }

    useEffect(() => {
        cardAnimation();
        InputAbimation();
    }, []);

    const ToLogin = () => {
        navigation.navigate("Login");
    };

    return (
        <ImageBackground
            source={require('../../assets/login_regester.jpg')}
            style={styles.backgroundImage}
        >
            <Text style={styles.title}>Create an account</Text>
            <Animated.View style={[styles.card, {
                opacity: fedCardAnimation,
                transform: fadeMouve.getTranslateTransform(),
            }]}>
                <Animated.View style={{ opacity: inputAnimation }}>
                    <TextInput style={[styles.input, { marginTop: 60 }]}
                        placeholder='Enter your Email'
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        keyboardType="email-address"
                    />
                    <TextInput style={styles.input}
                        placeholder='Enter your Password'
                        secureTextEntry={true}  // To hide password
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                    />
                    <TextInput style={styles.input}
                        placeholder='Enter Profile Picture URL'
                        value={profilePicture}
                        onChangeText={(text) => setProfilePicture(text)}
                    />
                    <TouchableOpacity style={styles.button}
                        onPress={handleSignUp}
                    >
                        <Text style={styles.textbutton}>Sign Up</Text>
                    </TouchableOpacity>
                    <View style={styles.textContainer}>
                        <Text style={styles.register}>You have an account? </Text>
                        <Text style={styles.goToLogin}
                            onPress={ToLogin}
                        > Login.</Text>
                    </View>
                </Animated.View>
            </Animated.View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundImage: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        resizeMode: "cover",
        width: "100%",
        height: "100%",
    },
    card: {
        borderRadius: 30,
        backgroundColor: "rgba(255, 255, 255, 0.4)",
        width: "100%",
        height: "50%",
        marginTop: 20,
    },
    title: {
        fontSize: 30,
        color: "#FFFFFF",
        marginTop: -80,
        marginBottom: 10,
        fontWeight: "bold",
        textAlign: "center"
    },
    input: {
        height: 50,
        borderColor: "gray",
        borderWidth: 1,
        padding: 10,
        backgroundColor: "rgba(165, 42, 42, 0.5)", // Transparent
        borderRadius: 16,
        marginTop: 50,
        marginHorizontal: 20,
    },
    button: {
        backgroundColor: '#6D4DEC',
        height: 50,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 50,
        marginHorizontal: 20,
        marginLeft: 90
    },
    textbutton: {
        fontSize: 20
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row"
    },
    register: {
        marginTop: 20,
        fontSize: 20,
    },
    goToLogin: {
        fontWeight: 'bold',
        marginTop: 20,
        fontSize: 20,
        color: '#190665D5',
    },
});

export default RegisterPage;
