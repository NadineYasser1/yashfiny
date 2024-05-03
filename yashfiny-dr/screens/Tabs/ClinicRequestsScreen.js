import { Text } from "react-native"
import RequestsList from "../../components/RequestsList";
import { clinicReqs } from "../../constants/DummyRequests";

const ClinicRequestsScreen = () => {
    return (
        <RequestsList data={clinicReqs} />
    )
}
export default ClinicRequestsScreen;