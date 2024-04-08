import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CustomInput = ({ placeholder, onAdd }) => {
    const [price, setPrice] = useState('');

    const handleAdd = () => {
        if (price) {
            onAdd(price);
            setPrice('');
        }
    };

    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
                placeholderTextColor='#aaa'
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
                <MaterialCommunityIcons name='plus-thick' size={20} color={Colors.accent800} />
            </TouchableOpacity>
        </View>
    );
};

export default CustomInput;
const styles = StyleSheet.create({

    inputContainer: {
        flexDirection: 'row',
        marginTop: 6,
    },
    input: {
        width: "34%",
        height: 40,
        backgroundColor: "white",
        borderRadius: 5,
        marginTop: 5,
        padding: 10,
        fontSize: 15,
        borderColor: Colors.primary800,
        marginEnd: 10,
    },
    addButton: {
        backgroundColor: '#f1f3f6',
        borderRadius: 40,
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    addButtonText: {
        color: Colors.accent800,
        fontSize: 22,
        fontWeight: "700",
        textAlignVertical: 'center',
        textAlign: 'center'
    },
});
