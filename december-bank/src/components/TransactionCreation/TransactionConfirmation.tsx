import { Input, InputLabel } from '@material-ui/core';

import { useLocation, useNavigate } from 'react-router-dom';
import { transactionListPath } from '../../routes/PathsConstants';

function TransactionConfirmation() {
  const navigate = useNavigate();
  const { state }: any = useLocation();

  const handleClick = () => {
    navigate(transactionListPath);
  };

  return (
    <div>
      <h3>TRANSACTION VOUCHER</h3>
      <br></br>
      <InputLabel>ORIGIN ACCOUNT : </InputLabel>
      {state.fromAccountId}({state.accountCurrency})<br></br>
      <br></br>
      <InputLabel>RECIEVER AACOUNT : </InputLabel>
      {state.toAccountId}
      <br></br>
      <br></br>
      <InputLabel>TRANSACTION CURRENCY : </InputLabel>
      {state.currencySelected}
      <br></br>
      <br></br>
      <InputLabel>TRANSACTION AMOUNT : </InputLabel>
      {state.amount}
      <br></br>
      <br></br>
      <InputLabel>AMOUNT TAKEN FROM ORIGIN ACCOUNT: </InputLabel>
      {state.finalAmount}
      <br></br>
      <br></br>
      <InputLabel>DESCRIPTION : </InputLabel>
      {state.description}
      <br></br>
    </div>
  );
}

export default TransactionConfirmation;
