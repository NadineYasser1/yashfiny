import { Text } from "react-native"
import RequestsList from "../../components/RequestsList";
import { clinicReqs } from "../../constants/DummyRequests";
import { axios } from "../../utils/axios";
import { API } from "../../utils/config";
import { useEffect, useState } from "react";
import LoadingScreen from "../../components/LoadingScreen";
import useLoading from "../../hooks/useLoading";
import Layout from "../../components/Layout";

const ClinicRequestsScreen = () => {
    const { loading, setIsLoading } = useLoading()
    const [reqs, setReqs] = useState()
    const fetchData = () => {
        setIsLoading(true)
        axios.get(API.requests.replace('{method}', 'clinic')).then(({ data }) =>
            setReqs(data.data)
        ).catch((err) => console.log(err)
        ).finally(() => setIsLoading(false))
    }
    const handleAccept = (reqId) => {
        const req = {
            id: reqId,
            status: 'accept'
        }
        setIsLoading(true)
        axios.post(API.postReq, req).then(({ data }) => {
            fetchData()
        }).catch((err) => console.log(err)).finally(() => setIsLoading(false))
    }
    const handleCancelApt = (reqId, message) => {
        const req = {
            id: reqId.reqId || reqId,
            message,
            status: 'decline'
        }
        setIsLoading(true)
        axios.post(API.postReq, req).then(({ data }) => {
            fetchData()
        }).catch((err) => console.log(err)).finally(() => setIsLoading(false))

    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <Layout loading={loading}>
            {reqs &&
                <RequestsList data={reqs} handleAccept={handleAccept} handleCancelApt={handleCancelApt} />}
        </Layout>
    )
}
export default ClinicRequestsScreen;