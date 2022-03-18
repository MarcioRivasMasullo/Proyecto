import { useEffect, useState } from 'react';
import {
  Accounts,
  Arbitraje,
  CreateTransactionBody,
  createTransactionRequest,
  CreateTransactionRequestResponse,
  getAccounts,
  getArbitraje,
} from '../../network/ApiClient';
import { Input, InputLabel, Select } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { notFoundPath, voucherPath } from '../../routes/PathsConstants';

const getCurrency = (id: number) => {
  switch (id) {
    case 1:
      return 'U$S';
    case 2:
      return '$';
    case 3:
      return '€';
    default:
      return 'U$S';
  }
};

function TransactionCreation() {
  const [originAccount, setOriginAccount] = useState<string>('');
  const [transactionCurrency, setTransactionCurrency] = useState<string>('');
  const [transactionValue, setTransactionValue] = useState<string>('');
  const [recieverAccount, setRecieverAccount] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [error, setError] = useState<string>();
  const navigate = useNavigate();

  let userAccounts: Accounts = {
    data: [],
  };

  const [accounts, setAccounts] = useState(userAccounts);

  useEffect(() => {
    getAccounts()
      .then((resp) => {
        setAccounts(resp.data);
      })
      .catch((resp) => {
        navigate(notFoundPath);
        setError('ERROR AL CARGAR SUS CUENTAS');
      });
  }, []);

  const handleSelectCuentaChange = (e: any) => setOriginAccount(e.target.value);

  const handleSelectMonedaChange = (e: any) => {
    setTransactionCurrency(e.target.value);
  };

  async function handleSubmit(e: any) {
    e.preventDefault();

    // Filter accounts by id to get the currency of selected account
    const accountSelectedCurrency = accounts.data.filter(
      (account) => account.id === Number(originAccount)
    )[0].currency.name;

    let finalAmountToTransfer = Number(transactionValue);
    console.log(
      accountSelectedCurrency,
      transactionCurrency,
      originAccount,
      recieverAccount,
      transactionValue,
      finalAmountToTransfer
    );
    // Check if arbitraje should be done or not.
    if (transactionCurrency !== accountSelectedCurrency) {
      console.log('entre');
      let usdValue = 0;
      let euValue = 0;
      try {
        const resp = await getArbitraje();
        const response: Arbitraje = resp.data;
        usdValue = response.data.usd;
        euValue = response.data.eu;
        switch (accountSelectedCurrency) {
          case 'URU':
            finalAmountToTransfer =
              transactionCurrency === 'USD'
                ? Number(transactionValue) * usdValue
                : Number(transactionValue) * euValue;
            break;
          case 'USD':
            finalAmountToTransfer =
              transactionCurrency === 'URU'
                ? Number(transactionValue) / usdValue
                : (Number(transactionValue) * euValue) / usdValue;
            break;
          case 'EU':
            finalAmountToTransfer =
              transactionCurrency === 'URU'
                ? Number(transactionValue) / euValue
                : (Number(transactionValue) * usdValue) / euValue;
            break;
          default:
            finalAmountToTransfer = finalAmountToTransfer;
        }
      } catch (err: any) {
        navigate(notFoundPath);
      }

      console.log(
        finalAmountToTransfer,
        transactionValue,
        transactionCurrency,
        accountSelectedCurrency
      );

      // transaction creation
      const data: CreateTransactionBody = {
        description: description,
        account_from: Number(originAccount),
        account_to: Number(recieverAccount),
        amount: Number(transactionValue),
        currency_name: transactionCurrency,
      };

      try {
        const resp = await createTransactionRequest(data);

        const response: CreateTransactionRequestResponse = resp.data;
        console.log(response.data);

        navigate(voucherPath, {
          state: {
            fromAccountId: originAccount,
            toAccountId: recieverAccount,
            amount: transactionValue,
            finalAmount: finalAmountToTransfer,
            description: description,
            accountCurrency: accountSelectedCurrency,
            currencySelected: transactionCurrency,
          },
        });
      } catch (error) {
        setError('INSUFICIENT BALANCE');
        // navigate to error page
      }

      // navigation to voucher
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <InputLabel>ORIGIN ACCOUNT :</InputLabel>
        <Select
          id="cuentaOrigen"
          required
          onChange={handleSelectCuentaChange}
          defaultValue=" "
        >
          {accounts.data.map((account) => (
            <option key={account.id} value={account.id}>
              Account {account.id} (Balance {getCurrency(account.currency_id)}
              {account.balance})
            </option>
          ))}
        </Select>
        <br></br>
        <br></br>
        <InputLabel>TRANSACTION CURRENCY :</InputLabel>
        <Select
          id="moneda"
          required
          onChange={handleSelectMonedaChange}
          defaultValue=" "
        >
          <option value="USD">U$S (American Dolars)</option>
          <option value="URU">$ (Uruguayan Pesos)</option>
          <option value="EU">€ (Euros)</option>
        </Select>
        <br></br>
        <br></br>
        <InputLabel>AMOUNT TO TRANSFER : </InputLabel>
        <Input
          type="number"
          id="importe"
          required
          onChange={(e) => setTransactionValue(e.target.value)}
        />
        <br></br>
        <br></br>
        <InputLabel>RECIEVER ACCOUNT : </InputLabel>
        <Input
          type="number"
          required
          onChange={(e) => setRecieverAccount(e.target.value)}
        />
        <br></br>
        <br></br>
        <InputLabel>DESCRIPTION : </InputLabel>
        <Input
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
        />
        <br></br>
        <br></br>
        <Input type="submit" value="CONFIRM TRANSACTION"></Input>
      </form>
      <br></br>
      <InputLabel style={{ color: 'red' }}>{error}</InputLabel>
    </div>
  );
}

export default TransactionCreation;
