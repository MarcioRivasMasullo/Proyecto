import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://decemberbank.inhouse.decemberlabs.com/api',
  // headers: {
  //   ContentType: 'application/json',
  // },
});

export interface checkLoginBody {
  email: string;
  password: string;
}

export interface Data {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  token: string;
  tokenExpiration: number;
}

export interface checkLoginResponse {
  data: Data;
  errors: [string];
}

export const checkLoginData = (data: object) => {
  return axiosClient.post('/users/login', data);
};

export default axiosClient;
