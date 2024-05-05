import { axios } from "./axios";
import { API } from "./config";

export function documentUploader(doc, result, func) {
    axios.post(API.upload, doc, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    }).then(({ data }) => {
        if (data.message == 'success') {
            func(result)
        }
    }).catch((err) => console.log(err)
    )

}