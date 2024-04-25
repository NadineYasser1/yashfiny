import React, { useState, useMemo } from 'react';
import { View, TouchableOpacity, Image, Alert, Dimensions } from 'react-native';
import { Avatar } from 'react-native-elements';
import * as DocumentPicker from 'expo-document-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import i18n from '../i18n';
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
const UploadAvatar = ({ handleChange }) => {
    const [avatarSource, setAvatarSource] = useState(null);

    const openDocumentPicker = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: "image/*",
                multiple: false,
            });
            if (result.canceled == false) {
                setAvatarSource(result.assets[0].uri)
                handleChange('avatar', { uri: result.assets[0].uri, type: result.assets[0].mimeType, size: result.assets[0].size })
            }

        } catch (error) {
            Alert.alert(
                i18n.t('error'),
                i18n.t('error_selecting_doc'),
                [
                    { text: "OK", onPress: () => { } }
                ],
                { cancelable: true }
            )

        }
    }


    const element = useMemo(() => {
        if (avatarSource) {
            return (
                <Avatar
                    rounded
                    source={{ uri: avatarSource }}
                    size="large"
                    containerStyle={{ backgroundColor: 'gray' }}
                />
            )
        }
        return (
            <View style={{ borderColor: 'grey', borderRadius: 30, height: 60, width: 60, borderWidth: 2, alignItems: 'center', justifyContent: 'center' }}>
                <MaterialCommunityIcons name='account' size={50} color={'grey'} />
            </View>

        )
    }, [avatarSource])

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            {element}
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    right: windowHeight > 750 ? windowHeight * 0.18 : windowHeight * 0.23,
                    top: avatarSource ? 50 : 45,
                    backgroundColor: 'transparent',
                    // padding: 5,
                }}
                onPress={openDocumentPicker}
            >
                {avatarSource ? <MaterialCommunityIcons
                    name='pencil' size={30} color={Colors.primary800}
                />
                    :
                    <MaterialCommunityIcons name='camera' size={30} color={Colors.primary800} />}
            </TouchableOpacity>
        </View>
    );
};

export default UploadAvatar;
