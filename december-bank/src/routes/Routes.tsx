import { Route, Navigate, Routes } from 'react-router-dom';
import Layout from '../components/Layout';
import Login from '../components/Login';
import TransactionCreation from '../components/TransactionCreation';
import TransactionList from '../components/TransactionList';
import {
  homePath,
  loginPath,
  newTransactionPath,
  notFoundPath,
  transactionListPath,
} from './PathsConstants';

const isAuthenticated = (): boolean => {
  const res = localStorage.getItem('userName') !== null;
  return res;
};

const RouterDiv = () => {
  return (
    <Routes>
      <Route index element={<Login />} />

      <Route path={loginPath} element={<Login />} />

      <Route
        path={transactionListPath}
        element={
          isAuthenticated() ? (
            <Layout>
              <TransactionList />
            </Layout>
          ) : (
            <Navigate to={loginPath} />
          )
        }
      />
      <Route
        path={newTransactionPath}
        element={
          isAuthenticated() ? (
            <Layout>
              <TransactionCreation />
            </Layout>
          ) : (
            <Navigate to={loginPath} />
          )
        }
      />
      <Route
        path={notFoundPath}
        element={
          isAuthenticated() ? (
            <Navigate to={transactionListPath} />
          ) : (
            <Navigate to={loginPath} />
          )
        }
      />
    </Routes>
  );
};

export default RouterDiv;
