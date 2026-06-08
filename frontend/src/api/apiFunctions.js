import axios from 'axios'

const backend = axios.create({
  baseURL: 'http://localhost:5000/api/',
});

export const getTest = () => backend.get("test");

export const loginRequest = (userName,password) => {
    

}