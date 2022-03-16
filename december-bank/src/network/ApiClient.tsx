import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://decemberbank.inhouse.decemberlabs.com/api',
});

// checkLogin types
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

// createTransaction types
export interface CreateTransactionBody {
  description: string;
  account_from: number;
  account_to: number;
  amount: number;
  currency_name: string;
}

export interface Data {
  id: number;
  from_account_id: number;
  to_account_id: number;
  amount: number;
  amount_from: number;
  amount_to: number;
  currency_name: string;
  description: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface CreateTransactionRequestResponse {
  data: Data;
}

// getAccounts types
export interface Currency {
  name: string;
}

export interface Datum {
  id: number;
  balance: number;
  owner_id: number;
  createdAt: Date;
  updatedAt: Date;
  currency_id: number;
  currency: Currency;
}

export interface Accounts {
  data: Datum[];
}

// getArbitraje types
export interface DataCurrencies {
  usd: number;
  eu: number;
}

export interface Arbitraje {
  data: DataCurrencies;
}

// REQUESTS FUNCTIONS
export const checkLoginData = (data: object) => {
  return axiosClient.post('/users/login', data);
};

export const createTransactionRequest = (
  data: CreateTransactionBody,
  config: object
) => {
  console.log(data, config);
  return axiosClient.post('/transactions', data, config);
};

export const getAccounts = (config: object) => {
  return axiosClient.get('/accounts', config);
};

export const getArbitraje = (config: object) => {
  return axiosClient.get('/transactions/rates', config);
};

export default axiosClient;
