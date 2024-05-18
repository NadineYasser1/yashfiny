import React, { useState, useMemo, useContext } from 'react';
import { View, TouchableOpacity, Image, Alert, Dimensions, Platform } from 'react-native';
import { Avatar } from 'react-native-elements';
import * as DocumentPicker from 'expo-document-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import i18n from '../i18n';
import { DoctorContext } from '../store/DoctorContext';
import { documentUploader } from '../utils/documentUploader';

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
const UploadAvatar = ({ handleChange, editDoctor }) => {

    const doctorCtx = useContext(DoctorContext)
    const data = new FormData()
    const [avatarSource, setAvatarSource] = useState(editDoctor ? doctorCtx.avatarUri || null : null);

    const handleSuccess = (result) => {
        setAvatarSource(result.assets[0].uri)
        doctorCtx.updateAvatar(result.assets[0].uri)
    }

    const openDocumentPicker = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: "image/*",
                multiple: false,
            });
            if (result.canceled == false) {
                data.append('file', {
                    name: result.assets[0].name,
                    type: result.assets[0].mimeType,
                    size: result.assets[0].size,
                    uri: Platform.OS == 'ios' ? result.assets[0].uri.replace('file://', '') : result.assets[0].uri

                })
            }
            if (editDoctor) {
                documentUploader(data, result, handleSuccess)
            } else {
                handleChange('avatar', { uri: result.assets[0].uri, type: result.assets[0].mimeType, size: result.assets[0].size })
                setAvatarSource(result.assets[0].uri)
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
