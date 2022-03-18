import { Route, Navigate, Routes } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Login from '../components/Login/Login';
import TransactionConfirmation from '../components/TransactionCreation/TransactionConfirmation';
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

const TransactionListElement = () => {
  console.log(isAuthenticated);
  return isAuthenticated() ? (
    <Layout>
      <TransactionList />
    </Layout>
  ) : (
    <Login />
  );
};

const NotFoundNavigation = () =>
  isAuthenticated() ? (
    <Navigate to={transactionListPath} />
  ) : (
    <Navigate to={loginPath} />
  );

const TransactionCreationElement = () => {
  console.log(isAuthenticated);
  return isAuthenticated() ? (
    <Layout>
      <TransactionCreation />
    </Layout>
  ) : (
    <Login />
  );
};

const TransactionVoucherElement = () =>
  isAuthenticated() ? (
    <Layout>
      <TransactionConfirmation />
    </Layout>
  ) : (
    <Login />
  );

/* aca no pude hacerlo generico. Lo que intente fue generar un componente asi:
    pero me tiraba un error con el children.

  const comp = (path:string) => (
    <Route path={path} element={
      isAuthenticated() ? (
      <Layout>
        {children}
      </Layout>
  ) : (
      <Login />
  );
    }>
  )*/

const RouterDiv = () => {
  return (
    <Routes>
      <Route index element={<TransactionListElement />} />
      <Route path={loginPath} element={<TransactionListElement />} />
      <Route path={transactionListPath} element={<TransactionListElement />} />
      <Route
        path={newTransactionPath}
        element={<TransactionCreationElement />}
      />
      <Route path={voucherPath} element={<TransactionVoucherElement />} />
      <Route path={notFoundPath} element={<NotFoundNavigation />} />
    </Routes>
  );
};

export default RouterDiv;
