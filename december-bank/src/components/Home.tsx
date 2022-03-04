import { Link, Route, Routes } from 'react-router-dom';

function Home() {
  return;
  <div>
    <nav>
      <Link to="/transactionsList">Transactions list</Link> <br></br>
      <Link to="/newTransaction">New transaction</Link>
    </nav>
    <Routes>
      {/* <Route path="/transactionsList" element={<TransactionList />} />
      <Route path="/newTransaction" element={<TransactionCreation />} /> */}
    </Routes>
  </div>;
}

export default Home;
