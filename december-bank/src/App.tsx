import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import TransactionCreation from './components/TransactionCreation';
import TransactionList from './components/TransactionList';

function App() {
  localStorage.setItem('usuarioAutenticado', JSON.stringify('false'));
  return (
    <div>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/home" element={<Home />}>
          <Route index element={<TransactionList />} />
          <Route path="transactionsList" element={<TransactionList />} />
          <Route path="newTransaction" element={<TransactionCreation />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Route>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
