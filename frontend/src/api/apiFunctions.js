import axios from 'axios'
import { API_URL } from "./config";

const backend = axios.create({
  baseURL: `${API_URL}/api/`,
});

export const getTest = () => backend.get("test");

export const loginRequest = (userName,password) => {
    

}