import { ErrorBoundary } from 'react-error-boundary';
import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './components/Login';
import TransactionCreation from './components/TransactionCreation';
import TransactionList from './components/TransactionList';
import error from './assets/images/error.png';
import RouterDiv from './routes/Routes';

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
      <ErrorBoundary FallbackComponent={fallbackComponent}>
        <RouterDiv />
      </ErrorBoundary>
    </div>
  );
}

export default App;
