import { Text } from "react-native"
import RequestsList from "../../components/RequestsList";
import { specialReqs } from "../../constants/DummyRequests";

const SpecialRequestsScreen = () => {
    return (
        <RequestsList data={specialReqs} />
    )
}
export default SpecialRequestsScreen;