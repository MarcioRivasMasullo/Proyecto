import { Route, Navigate, Routes } from 'react-router-dom';
import Home from '../components/Home';
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

const isAuthenticated = () => localStorage.getItem('userName');

const RouterDiv = () => {
  return (
    <Routes>
      <Route index element={<Login />} />

      <Route path={loginPath} element={<Login />} />

      <Route
        path={homePath}
        element={
          localStorage.getItem('userName') ? (
            <Home />
          ) : (
            <Navigate to={loginPath} />
          )
        }
      >
        <Route index element={<TransactionList />} />
        <Route path={transactionListPath} element={<TransactionList />} />
        <Route path={newTransactionPath} element={<TransactionCreation />} />
        <Route
          path={notFoundPath}
          element={
            localStorage.getItem('userName') ? (
              <Navigate to={homePath + '/' + transactionListPath} />
            ) : (
              <Navigate to={loginPath} />
            )
          }
        />
      </Route>

      <Route
        path={notFoundPath}
        element={
          localStorage.getItem('userName') !== null ? (
            <Navigate to={homePath + transactionListPath} />
          ) : (
            <Navigate to={loginPath} />
          )
        }
      />
    </Routes>
  );
};

export default RouterDiv;
