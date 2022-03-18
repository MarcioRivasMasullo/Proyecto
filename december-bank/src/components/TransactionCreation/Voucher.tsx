import { Input, InputLabel } from '@material-ui/core';

import { useLocation } from 'react-router-dom';
import getCurrencySymbol from '../../helpers/currenciesTranformations';

function Voucher() {
  const { state }: any = useLocation();

  return (
    <div>
      <InputLabel style={{ color: 'DarkBlue' }}>TRANSACTION VOUCHER</InputLabel>
      <br></br>
      <br></br>
      <InputLabel style={{ color: 'DarkSlateBlue' }}>
        ORIGIN ACCOUNT :{' '}
      </InputLabel>
      <InputLabel>
        {state.fromAccountId}({getCurrencySymbol(state.accountCurrency)})
      </InputLabel>
      <br></br>
      <InputLabel style={{ color: 'DarkSlateBlue' }}>
        RECIEVER ACOUNT :{' '}
      </InputLabel>
      <InputLabel>{state.toAccountId}</InputLabel>
      <br></br>
      <InputLabel style={{ color: 'DarkSlateBlue' }}>
        TRANSACTION CURRENCY :{' '}
      </InputLabel>
      <InputLabel>{getCurrencySymbol(state.currencySelected)}</InputLabel>
      <br></br>
      <InputLabel style={{ color: 'DarkSlateBlue' }}>
        TRANSACTION AMOUNT :{' '}
      </InputLabel>
      <InputLabel>{state.amount}</InputLabel>
      <br></br>
      <InputLabel style={{ color: 'DarkSlateBlue' }}>DESCRIPTION : </InputLabel>
      <InputLabel>{state.description}</InputLabel>
      <br></br>
      {state.currencySelected !== state.accountCurrency ? (
        <div>
          <InputLabel style={{ color: 'DarkSlateBlue' }}>
            AMOUNT TAKEN FROM ORIGIN ACCOUNT:{' '}
          </InputLabel>
          <InputLabel>
            {getCurrencySymbol(state.accountCurrency)}
            {state.finalAmount}
          </InputLabel>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Voucher;
