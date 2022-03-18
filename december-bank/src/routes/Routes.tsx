import { Route, Navigate, Routes, RouteProps } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Login from '../components/Login/Login';
import Voucher from '../components/TransactionCreation/Voucher';
import TransactionCreation from '../components/TransactionCreation/TransactionCreation';
import TransactionList from '../components/TransactionList/TransactionList';
import {
  loginPath,
  newTransactionPath,
  notFoundPath,
  transactionListPath,
  voucherPath,
} from './PathsConstants';

export const isAuthenticated = (): boolean => {
  const res = localStorage.getItem('userToken') !== null;
  return res;
};

const ProtectedRoute = (childrenComponent: JSX.Element) => {
  console.log(childrenComponent, isAuthenticated());
  return isAuthenticated() ? <Layout>{childrenComponent}</Layout> : <Login />;
};

const ProtectedRouteWithNavigation = (navigationPath: string) => {
  console.log(isAuthenticated());
  return isAuthenticated() ? <Navigate to={navigationPath} /> : <Login />;
};

const RouterDiv = () => {
  return (
    <Routes>
      {/* <Route
        index
        element={ProtectedRouteWithNavigation(transactionListPath)}
      /> */}
      <Route
        path={loginPath}
        element={ProtectedRouteWithNavigation(transactionListPath)}
      />
      <Route
        path={transactionListPath}
        element={ProtectedRoute(<TransactionList />)}
      />
      <Route
        path={newTransactionPath}
        element={ProtectedRoute(<TransactionCreation />)}
      >
        <Route path={'voucher'} element={ProtectedRoute(<Voucher />)} />
      </Route>
      <Route
        path={notFoundPath}
        element={ProtectedRouteWithNavigation(transactionListPath)}
      />
    </Routes>
  );
};

export default RouterDiv;
