import { useEffect, useState } from "react"
import { View, FlatList, Alert } from "react-native"
import { SearchBar } from "react-native-elements"
import i18n from "../i18n"
import filter from "lodash.filter"
import RequestItem from "./RequestItem"
import MessagesModal from "./MessagesModal"

const RequestsList = ({ data, handleCancelApt, handleAccept }) => {

    const [requests, setRequests] = useState(data)
    const [search, setSearch] = useState('')
    const [messagesModal, setMessagesModal] = useState(false)
    const [messagesModalData, setMessagesModalData] = useState()
    console.log(data)
    const handleSearch = (query) => {
        setSearch(query);

        const filteredData = filter(data, (patient) => {
            return contains(patient, query.toLowerCase());
        });
        setRequests(filteredData);
    };

    const contains = ({ fname, lname, id }, query) => {
        return fname?.toLowerCase().includes(query) ||
            lname?.toLowerCase().includes(query) ||
            id?.toString().includes(query) ||
            `${fname?.toLowerCase()} ${lname.toLowerCase()}`.includes(query);
    };

    const handleDecline = (reqId) => {

        Alert.alert(i18n.t('yashfiny_asks_you'), i18n.t('send_quick_message_instead'),
            [
                {
                    text: i18n.t('no'),
                    style: "cancel",
                    onPress: () => { handleCancelApt(reqId, null), setMessagesModal(false) }
                },
                {
                    text: i18n.t('yes'),
                    onPress: () => {
                        setMessagesModal(true);
                        setMessagesModalData({ reqId });
                    }
                }
            ],
            { cancelable: false });


    }

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <View>
                <SearchBar
                    placeholder={i18n.t('search_reqs')}
                    lightTheme
                    round
                    value={search}
                    onChangeText={handleSearch}
                    containerStyle={{
                        backgroundColor: 'transparent',
                        width: '100%',
                        borderTopWidth: 0,
                        borderBottomWidth: 0,
                    }}
                    inputContainerStyle={{
                        borderColor: 'white',
                        backgroundColor: 'white',
                    }}
                    inputStyle={{ color: 'black', fontSize: 13 }} />
            </View>
            <MessagesModal
                modalVisible={messagesModal}
                setModalVisible={setMessagesModal}
                handleSelectMessage={handleCancelApt}
                reqId={messagesModalData}
            />
            <FlatList
                data={requests}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => <RequestItem
                    avatarUri={item.avatar}
                    fname={item.fname}
                    lname={item.lname}
                    aptDate={item.time}
                    gender={item.gender}
                    age={item.age?.toString() || null}
                    currentComplaint={item.currentComplaint}
                    symptoms={item.symptoms}
                    handleAccept={() => handleAccept(item.reqId)}
                    handleDecline={() => handleDecline(item.reqId)}

                />
                }
            />
        </View>
    )
}
export default RequestsList