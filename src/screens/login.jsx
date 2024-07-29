import {
    Animated,
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../Fire';
import { signInWithEmailAndPassword } from 'firebase/auth';
const LoginPage = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const fedCardAnimation = useRef(new Animated.Value(0)).current;
    const fadeMouve = useRef(new Animated.ValueXY({ x: 0, y: 100 })).current;
    const inputAnimation = useRef(new Animated.Value(0)).current;
    const titleAnimation = useRef(new Animated.Value(0)).current;


    const LoginHandel = () => {

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("Login success")
                navigation.navigate('App');
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                Alert.alert(
                    "Eroor Login Failed",
                    errorMessage,
                );
                console.log(
                    "Error Login"
                );
            });
    }

    const cardAnimation = () => {
        Animated.sequence([
            Animated.timing(fedCardAnimation, {
                toValue: 2,
                duration: 2500,
                useNativeDriver: true
            }),
            Animated.sequence([
                Animated.timing(fadeMouve, {
                    toValue: { x: 0, y: 0 },
                    duration: 1000,
                    useNativeDriver: true
                }),
                Animated.sequence([
                    Animated.timing(inputAnimation, {
                        toValue: 2,
                        duration: 1500,
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
    const TitleAnimation = () => {
        Animated.timing(titleAnimation, {
            toValue: 1,
            duration: 1000,
            delay: 1500,
            useNativeDriver: true
        }).start();
    }
    useEffect(() => {
        cardAnimation();
        InputAbimation();
        TitleAnimation();
    }, [cardAnimation, InputAbimation, TitleAnimation]);




    const ToRegester = () => {
        navigation.navigate("Regester");
    };
    return (

        <ImageBackground
            source={require('../../assets/login_regester.jpg')}
            style={styles.backgroundImage}
        >

            <Animated.Text style={[styles.title, { opacity: titleAnimation }]}>Welcome To Your App</Animated.Text>

            <Animated.View style={[styles.card, {
                opacity: fedCardAnimation,
                transform: fadeMouve.getTranslateTransform(),
            }]}>
                <Animated.View style={{
                    opacity: inputAnimation
                }}>

                    <TextInput style={[styles.input, { marginTop: 60 }]}
                        placeholder='Enter your Email'
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                        keyboardType="email-address"
                    />
                    <TextInput style={styles.input}
                        placeholder='Enter your Password'
                        secureTextEntry={true}  //To hide password
                        onChangeText={(text) => setPassword(text)}
                    />
                    <TouchableOpacity style={styles.button}
                        onPress={LoginHandel}
                    >
                        <Text style={styles.textbutton}>Login</Text>
                    </TouchableOpacity>
                    <View style={styles.textcontener}>

                        <Text style={styles.regster}>Dont have acount?</Text>
                        <Text style={styles.goToRegester}
                            onPress={ToRegester}
                        > create one .</Text>
                    </View>

                </Animated.View>
            </Animated.View>
        </ImageBackground>

    )
}

const styles = StyleSheet.create({
    continer: {
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
        borderRadius: 40,
        backgroundColor: "rgba(255, 255, 255, 0.25)",
        width: "100%",
        height: "50%",
    },
    title: {
        fontSize: 30,
        color: "#FFFFFF",
        marginTop: 20,
        marginBottom: 10,
        fontWeight: "bold",
        textAlign: "center"
    },
    input: {
        height: 50,
        borderColor: "gray",
        borderWidth: 1,
        padding: 10,
        backgroundColor: "rgba(165, 42, 42, 0.5)", // شفاف
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
    textcontener: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row"
    },
    regster: {
        marginTop: 20,
        fontSize: 20,
    },
    goToRegester: {
        fontWeight: 'bold',
        marginTop: 20,
        fontSize: 20,
        color: '#190665D5',
    },
});



export default LoginPage