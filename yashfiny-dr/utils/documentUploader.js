import { axios } from "./axios";
import { API } from "./config";


const getParam = (key) => {
    switch (key) {
        case 'academic_degree': return 'deg'
        case 'certificates': return 'cert'
        case 'medical_license': return 'lic'
    }
}

export function documentUploader(doc, result, func, doctorId, fnKey) {
    func(result)
    const route = doctorId ? API.upload.replace('{doctorId}', doctorId).replace('{documentType}', getParam(fnKey)) : API.uploadAvatar
    axios.post(route, doc, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    }).then(({ data }) => {
        if (data.message == 'success') {

        }
    }).catch((err) => console.log(err)
    )

}