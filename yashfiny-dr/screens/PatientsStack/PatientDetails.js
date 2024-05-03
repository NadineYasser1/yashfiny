import { Text } from "react-native"

const PatientDetails = ({ route }) => {
    console.log(route.params)
    return (
        <Text>Patient Details</Text>
    )
}
export default PatientDetails