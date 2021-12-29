import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {store} from './../redux/store/index';
import * as authActions from './../redux/actions/authActions';
const API_URL = "http://localhost:45757/api";

export const publicRequest = axios.create({
    baseURL :  API_URL,
});

export const privateRequest = axios.create({
    baseURL :  API_URL,
    headers: {Authorization :  localStorage.getItem('adminToken') !== null && `Bearer ${JSON.parse(localStorage.getItem('adminToken')).accessToken}`}
});

privateRequest.interceptors.request.use(
    async (config) => {
        const token = JSON.parse(localStorage.getItem('adminToken'));
        //console.log(token.accessToken);
        let currentDate = new Date(); 
        const decodedToken = jwt_decode(token.accessToken);
        if (decodedToken.exp * 1000  < currentDate.getTime()) {     
            store.dispatch(authActions.expireLogOut.expireLogOutRequest());    
        }else{
            config.headers["Authorization"] = `Bearer ${JSON.parse(localStorage.getItem('adminToken')).accessToken}`;
            return config;   
        }
    },
    (error) => {
      return Promise.reject(error);
    }
);