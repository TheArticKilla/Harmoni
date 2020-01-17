import getCookie from "./cookie";

const axios = require("axios");
let url: string = "http://localhost:8080";
const token = getCookie("token");

class files {
  postProfilePicture(data: any) {
    let formData = new FormData();
    formData.append("image", data);
    return axios
      .post(url + "/image/profile/", formData, {
        headers: {
          token: token,
          "Content-Type": "multipart/form-data"
        }
      })
      .then((response: { data: JSON }) => response.data);
  }

  postContracts(data: any, token: String, userID: number, eventID: number) {
    let formData = new FormData();
    formData.append("contract", data);
    return axios
      .put(
        url + "/files/contract/user/" + userID + "/event/" + eventID,
        formData,
        {
          headers: {
            token: token,
            "Content-Type": "multipart/form-data"
          }
        }
      )
      .then((response: { data: JSON }) => response.data);
  }

  postEventPicture(data: any, id: number) {
    let formData = new FormData();
    formData.append("image", data);
    return axios
      .post(url + "/image/event/" + id, formData, {
        headers: {
          token: token,
          "Content-Type": "multipart/form-data"
        }
      })
      .then((response: { data: JSON }) => response.data);
  }
}

export default new files();
