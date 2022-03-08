import { ErrorBoundary } from 'react-error-boundary';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import TransactionCreation from './components/TransactionCreation';
import TransactionList from './components/TransactionList';
import error from './assets/images/error.png';

const fallbackComponent = () => (
  <div
    style={{
      background: '#bbb',
      color: 'white',
      textAlign: 'center',
      borderRadius: '2s%',
    }}
  >
    <h1>AN ERROR HAS OCURRED, PLEASE REPORT THIS PROBLEM.</h1>
    <img
      src={error}
      alt="Error"
      style={{
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '22%',
        marginTop: '10%',
      }}
    ></img>
  </div>
);

function App() {
  return (
    <div>
      {/* <ErrorBoundary FallbackComponent={fallbackComponent}> */}
      <Routes>
        <Route index element={<Login />} />
        {/* <Route
            path="/home"
            element={
              localStorage.getItem('usuarioAutenticado') ? (
                <Home />
              ) : (
                <Navigate to="/" />
              )
            }
          >
            <Route index element={<TransactionList />} />
            <Route path="transactionsList" element={<TransactionList />} />
            <Route path="newTransaction" element={<TransactionCreation />} />
            <Route
              path="*"
              element={
                localStorage.getItem('usuarioAutenticado') ? (
                  <Navigate to="/home" />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          </Route>
          <Route path="/" element={<Login />} />
          <Route
            path="*"
            element={
              localStorage.getItem('usuarioAutenticado') ? (
                <Navigate to="/home" />
              ) : (
                <Navigate to="/" />
              )
            }
          /> */}
      </Routes>
      {/* </ErrorBoundary> */}
    </div>
  );
}

export default App;
