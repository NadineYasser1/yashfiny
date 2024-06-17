import { createContext, useState } from "react";

export const PatientsContext = createContext({
    patientData: {},
    addPatient: (patient) => { },
});

const PatientsContextProvider = ({ children }) => {

    const [patient, setPatient] = useState({});

    const addPatient = (patient) => {
        setPatient(patient);

    }


    const value = {
        patientData: patient,
        addPatient
    }

    return <PatientsContext.Provider value={value}>{children}</PatientsContext.Provider>
}

export default PatientsContextProvider;