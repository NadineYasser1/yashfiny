import { Text } from "react-native"
import RequestsList from "../../components/RequestsList";
import { videoReqs } from "../../constants/DummyRequests";
import { axios } from "../../utils/axios";
import { API } from "../../utils/config";
import { useEffect, useState } from "react";
import LoadingScreen from "../../components/LoadingScreen";

const VideoRequestsScreen = () => {
    const [loading, setLoading] = useState(false)
    const [reqs, setReqs] = useState(videoReqs)
    const fetchData = () => {
        setLoading(true)
        axios.get(API.requests.replace('{method}', 'video')).then(({ data }) =>
            console.log(data.data[0])
        ).catch((err) => console.log(err)
        ).finally(() => setLoading(false))
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        loading ? <LoadingScreen notFromNav={true} /> : reqs && <RequestsList data={reqs} />
    )
}
export default VideoRequestsScreen;