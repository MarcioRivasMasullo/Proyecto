import { useEffect, useState } from 'react';
import {
  Accounts,
  Arbitraje,
  CreateTransactionBody,
  createTransactionRequest,
  CreateTransactionRequestResponse,
  getAccounts,
  getArbitraje,
} from '../network/ApiClient';
import Button from '@mui/material/Button';
import { Input, InputLabel, Select } from '@material-ui/core';

const getCurrency = (id: number) => {
  switch (id) {
    case 2:
      return '€';
    case 1:
      return '$';
    case 0:
      return 'U$S';
    default:
      return 'U$S';
  }
};

function TransactionCreation() {
  const [cuentaOrigen, setCuentaOrigen] = useState<string>('');
  const [moneda, setMoneda] = useState<string>('');
  const [valorTransaccion, setValorTransaccion] = useState<string>('');
  const [beneficiario, setBeneficiario] = useState<string>('');
  const [referencia, setReferencia] = useState<string>('');
  const [error, setError] = useState<string>();
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const requestsConfig = {
    headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` },
  };

  let userAccounts: Accounts = {
    data: [],
  };

  const [accounts, setAccounts] = useState(userAccounts);

  useEffect(() => {
    getAccounts(requestsConfig)
      .then((resp) => {
        setAccounts(resp.data);
      })
      .catch((resp) => {
        // change this, should be dispatched to an error page
        setError('ERROR AL CARGAR SUS CUENTAS');
      });
  }, []);

  const handleSelectCuentaChange = (e: any) => setCuentaOrigen(e.target.value);

  const handleSelectMonedaChange = (e: any) => {
    console.log(e.target.value);
    setMoneda(e.target.value);
  };

  const handleConfirm = () => {
    const data: CreateTransactionBody = {
      description: referencia,
      account_from: Number(cuentaOrigen),
      account_to: Number(beneficiario),
      amount: Number(valorTransaccion),
      currency_name: moneda,
    };

    createTransactionRequest(data, requestsConfig)
      .then((resp) => {
        const response: CreateTransactionRequestResponse = resp.data;
        console.log(response.data);
      })
      .catch((resp) => {
        console.log(resp);
        // navigate to error page
      })
      .then(() => {
        setConfirmationOpen(true);
      });
  };

  if (!confirmationOpen)
    return (
      <div>
        <form onSubmit={() => setConfirmationOpen(true)}>
          <InputLabel>CUENTA DE ORIGEN :</InputLabel>
          <Select
            id="cuentaOrigen"
            required
            onChange={handleSelectCuentaChange}
          >
            {accounts.data.map((account) => (
              <option key={account.id} value={account.id}>
                Cuenta {account.id} (Saldo {getCurrency(account.currency_id)}{' '}
                {account.balance})
              </option>
            ))}
          </Select>
          <br></br>
          <br></br>
          <InputLabel>MONEDA :</InputLabel>
          <Select id="moneda" required onChange={handleSelectMonedaChange}>
            <option value="USD">U$S (Dolares Americanos)</option>
            <option value="URU">$ (Pesos Uruguayos)</option>
            <option value="EU">€ (Euros)</option>
          </Select>
          <br></br>
          <br></br>
          <InputLabel>IMPORTE A TRANSFERIR : </InputLabel>
          <Input
            type="number"
            id="importe"
            required
            onChange={(e) => setValorTransaccion(e.target.value)}
          />
          <br></br>
          <br></br>
          <InputLabel>CUENTA DEL BENEFICIARIO : </InputLabel>
          <Input
            type="number"
            required
            onChange={(e) => setBeneficiario(e.target.value)}
          />
          <br></br>
          <br></br>
          <InputLabel>REFERENCIA : </InputLabel>
          <Input
            type="text"
            onChange={(e) => setReferencia(e.target.value)}
            fullWidth
          />
          <br></br>
          <br></br>
          <Input type="submit" value="CONFIRMAR"></Input>
        </form>
        {error}
      </div>
    );
  else {
    // Filter accounts by id to get the currency of selected account
    const accountSelectedCurrency = accounts.data.filter(
      (account) => account.id === Number(cuentaOrigen)
    )[0].currency.name;

    const ac = accounts.data.filter(
      (account) => account.id === Number(cuentaOrigen)
    );

    console.log(accountSelectedCurrency);
    console.log(moneda);

    let finalAmountToTransfer = Number(valorTransaccion);

    // Check if arbitraje should be done or not.
    if (moneda !== accountSelectedCurrency) {
      let usdValue = 0;
      let euValue = 0;
      getArbitraje(requestsConfig)
        .then((response: Arbitraje) => {
          usdValue = response.data.usd;
          euValue = response.data.eu;
          switch (accountSelectedCurrency) {
            case 'URU':
              finalAmountToTransfer =
                moneda === 'USD'
                  ? Number(valorTransaccion) * usdValue
                  : Number(valorTransaccion) * euValue;
              break;
            case 'USD':
              finalAmountToTransfer =
                moneda === 'URU'
                  ? Number(valorTransaccion) / usdValue
                  : Number(valorTransaccion) / euValue;
              break;
            case 'EU':
              finalAmountToTransfer =
                moneda === 'URU'
                  ? Number(valorTransaccion) / euValue
                  : Number(valorTransaccion) / usdValue;
              break;
            default:
              finalAmountToTransfer = Number(valorTransaccion);
          }
        })
        .catch((response) => {
          // navegate to error page
          console.log(response);
        });
    }

    return (
      <div>
        <InputLabel>CUENTA ORIGEN : </InputLabel>
        {cuentaOrigen}
        <br></br>
        <InputLabel>CUENTA DESTINO : </InputLabel>
        {beneficiario}
        <br></br>
        <InputLabel>MONEDA : </InputLabel>
        {moneda}
        <br></br>
        <InputLabel>MONTO : </InputLabel>
        {finalAmountToTransfer}
        <br></br>
        <InputLabel>REFERENCIA : </InputLabel>
        {referencia}
        <br></br>
        <Button onClick={handleConfirm}>CONFIRMAR</Button>
        <Button onClick={() => setConfirmationOpen(false)}>CANCELAR</Button>
      </div>
    );
  }
}

export default TransactionCreation;
