import { Text } from "react-native"
import RequestsList from "../../components/RequestsList";
import { clinicReqs } from "../../constants/DummyRequests";
import { axios } from "../../utils/axios";
import { API } from "../../utils/config";
import { useEffect, useState } from "react";
import LoadingScreen from "../../components/LoadingScreen";

const ClinicRequestsScreen = () => {
    const [loading, setLoading] = useState(false)
    const [reqs, setReqs] = useState()
    const fetchData = () => {
        setLoading(true)
        axios.get(API.requests.replace('{method}', 'clinic')).then(({ data }) =>
            setReqs(data.data)
        ).catch((err) => console.log(err)
        ).finally(() => setLoading(false))
    }
    const handleAccept = (reqId) => {
        const req = {
            id: reqId,
            status: 'accept'
        }
        axios.post(API.postReq, req).then(({ data }) => {
            fetchData()
        }).catch((err) => console.log(err))
    }
    const handleCancelApt = (reqId, message) => {
        const req = {
            id: reqId.reqId || reqId,
            message,
            status: 'decline'
        }
        axios.post(API.postReq, req).then(({ data }) => {
            fetchData()
        }).catch((err) => console.log(err))

    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        loading ? <LoadingScreen notFromNav={true} /> : reqs && <RequestsList data={reqs} handleAccept={handleAccept} handleCancelApt={handleCancelApt} />
    )
}
export default ClinicRequestsScreen;