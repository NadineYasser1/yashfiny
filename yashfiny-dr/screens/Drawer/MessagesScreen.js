import { useMemo, useState, useLayoutEffect } from "react"
import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native"
import Card from "../../components/Card"
import { Colors } from "../../constants/colors"
import dayjs from "dayjs"
import i18n from "../../i18n"
import { useNavigation } from "@react-navigation/native"

const MessagesScreen = () => {
    const navigation = useNavigation()
    useLayoutEffect(() => {
        navigation.setOptions({
            title: i18n.t('messages')
        })
    }, [navigation])
    const [expandedIndex, setExpandedIndex] = useState(-1)

    const toggleExpand = (index) => {
        setExpandedIndex(expandedIndex === index ? -1 : index);
    };

    const messages = []

    // const messages = [{
    //     subject: 'Add an avatar!',
    //     content: 'You can now add avatars to your profile, just by clicking the camera icon on your profile! here are the steps 1. lorem ipsum 2. lorem ipsum',
    //     date: new Date()
    // },
    // {
    //     subject: 'Add an avatar!',
    //     content: 'You can now add avatars to your profile, just by clicking the camera icon on your profile! here are the steps 1. lorem ipsum 2. lorem ipsum',
    //     date: new Date()
    // },
    // {
    //     subject: 'Add an avatar!',
    //     content: 'You can now add avatars to your profile, just by clicking the camera icon on your profile! here are the steps 1. lorem ipsum 2. lorem ipsum',
    //     date: new Date()
    // }]

    const screen = useMemo(() => {
        if (messages.length > 0) {
            return messages.map((message, index) => (
                <Card key={index}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.nameLabel}>{message.subject}</Text>
                        <Text style={styles.dateLabel}>{dayjs(message.date).format('DD MMMM')}</Text>
                    </View>
                    <View style={{
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        marginTop: 5,
                        padding: 1,
                        flexDirection: expandedIndex == index ? 'column' : 'row'
                    }}>
                        <Text>{expandedIndex === index ? message.content : `${message.content.slice(0, 30)}...`}</Text>
                        <View>
                            {expandedIndex !== index && (
                                <TouchableOpacity onPress={() => toggleExpand(index)}>
                                    <Text style={styles.expandText}>{i18n.t('see_more')}</Text>
                                </TouchableOpacity>
                            )}
                            {expandedIndex === index && (
                                <TouchableOpacity onPress={() => toggleExpand(index)}>
                                    <Text style={styles.expandText}>{i18n.t('see_less')}</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </Card>
            ));
        } else {
            return (
                <View style={styles.emptyContainer}>
                    <Image source={require('../../assets/noMessagesIcon.png')} style={styles.image} />
                    <View>
                        <Text style={styles.messagesText}>{i18n.t('no_new_msgs')}</Text>
                    </View>
                </View>
            );
        }
    }, [expandedIndex, messages])

    return screen;
}
const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        marginBottom: 4,
        marginTop: 10,
        // paddingHorizontal: 10
    },
    nameLabel: {
        fontWeight: "700",
        fontSize: 15,
        color: 'black',
        marginBottom: 4,
        marginRight: 60

    },
    dateLabel: {
        fontWeight: "500",
        fontSize: 13,
        color: Colors.grey300,
        marginLeft: 60
    },
    expandContainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 5,
        padding: 1
    },
    expandText: {
        color: 'blue',
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100
    },
    image: {
        width: 250,
        height: 250,
        marginBottom: 40,
    },
    messagesText: {
        padding: 10,
        marginHorizontal: 50,
        textAlign: 'center',
        color: Colors.primary800,
        fontSize: 16
    }
})

export default MessagesScreen;

