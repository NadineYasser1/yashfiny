import { Text } from "react-native"
import RequestsList from "../../components/RequestsList";
import { videoReqs } from "../../constants/DummyRequests";

const VideoRequestsScreen = () => {
    return (
        <RequestsList data={videoReqs} />
    )
}
export default VideoRequestsScreen;