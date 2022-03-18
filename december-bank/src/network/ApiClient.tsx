import axios from 'axios';

console.log(`Bearer ${localStorage.getItem('userToken')}`);

const axiosClientWithAuthorization = axios.create({
  baseURL: 'https://decemberbank.inhouse.decemberlabs.com/api',
  headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` },
});

const axiosClientWithoutAuthorization = axios.create({
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

export interface AccountData {
  id: number;
  balance: number;
  owner_id: number;
  createdAt: Date;
  updatedAt: Date;
  currency_id: number;
  currency: Currency;
}

export interface Accounts {
  data: AccountData[];
}

// getArbitraje types
export interface DataCurrencies {
  usd: number;
  eu: number;
}

export interface Arbitraje {
  data: DataCurrencies;
}

// getTransactions
export interface TransactionData {
  id: number;
  description: string;
  amount: number;
  amount_from: number;
  amount_to: number;
  currency_name: string;
  createdAt: Date;
  updatedAt: Date;
  from_account_id: number;
  to_account_id: number;
}

export interface Pagination {
  hasMorePages: boolean;
  pageSize: number;
  currentPage: number;
  totalRows: number;
  totalPages: number;
}

export interface GetTransactionsType {
  data: TransactionData[];
  pagination: Pagination;
}

// REQUESTS FUNCTIONS
export const checkLoginData = (data: object) => {
  return axiosClientWithoutAuthorization.post('/users/login', data);
};

export const createTransactionRequest = (data: CreateTransactionBody) => {
  return axiosClientWithAuthorization.post('/transactions', data);
};

export const getAccounts = () => {
  return axiosClientWithAuthorization.get('/accounts');
};

export const getArbitraje = () => {
  return axiosClientWithAuthorization.get('/transactions/rates');
};

export const getTransactions = (headers: object) => {
  return axiosClientWithAuthorization.get('/transactions', headers);
};

export default axiosClientWithAuthorization;
