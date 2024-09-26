import { BACKEND_URL } from "../config";
import axios from "axios";

export default async function fetchUserData() {
    const response = await axios.get(`${BACKEND_URL}/api/v1/user/get-user`, {
        headers: {
            Authorization: localStorage.getItem("token")
        }
    });
    const data = response.data;
    const userName = data.userData.name;
    localStorage.setItem("userName", userName)
}