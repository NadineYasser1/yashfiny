import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { Colors } from '../constants/colors';
import { useNavigation } from '@react-navigation/native';

const LoadingScreen = ({ notFromNav }) => {
    const navigation = !notFromNav ? useNavigation() : null
    useEffect(() => {
        if (!notFromNav) {
            navigation.setOptions({
                headerShown: false
            })
        }
    }, [notFromNav])
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/fullLogo.png')}
                style={styles.image}
                resizeMode="contain"
            />
            <View style={styles.progressBarContainer}>
                <ProgressBar
                    indeterminate
                    color={Colors.accent800}
                    styleAttr="Horizontal"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    image: {
        width: '60%',
        height: '60%',
        marginBottom: 100
    },
    progressBarContainer: {
        width: '80%',
    },
});

export default LoadingScreen;
