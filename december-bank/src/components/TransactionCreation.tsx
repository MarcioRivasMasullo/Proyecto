import { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import {
  CreateTransaction,
  Transaction,
} from '../redux/actions/transactionAction';
import { useDispatch } from 'react-redux';

function TransactionCreation() {
  const cuentasPosibles = ['12334', '12335', '12336'];
  const monedasPosibles = ['U$S', '$', '€'];

  const [cuentaOrigen, setCuentaOrigen] = useState<string>();
  const [moneda, setMoneda] = useState<string>();
  const [valorTransaccion, setValorTransaccion] = useState<string>();
  const [beneficiario, setBeneficiario] = useState<string>();
  const [referencia, setReferencia] = useState<string>();
  const [id, setId] = useState('0');

  const dispatch = useDispatch();

  const handleSelectCuentaChange = (e: any) =>
    setCuentaOrigen(cuentasPosibles[e.target.value]);

  const handleSelectMonedaChange = (e: any) =>
    setMoneda(monedasPosibles[e.target.value]);

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    const newTransaction: Transaction = {
      id,
      cuentaOrigen,
      moneda,
      valorTransaccion,
      beneficiario,
      referencia,
    };
    console.log(newTransaction);
    setId((parseInt(id) + 1).toString());

    dispatch(CreateTransaction(newTransaction));
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label>CUENTA DE ORIGEN :</label>
        <select
          name="cuentaOrigen"
          required
          onChange={handleSelectCuentaChange}
        >
          <option value="0">Cuenta 12334 (Saldo $ 500.00)</option>
          <option value="1">Cuenta 12335 (Saldo U$S 5000.00)</option>
          <option value="2">Cuenta 12336 (Saldo € 5000.00)</option>
        </select>
        <br></br>
        <br></br>
        <label>MONEDA :</label>
        <select id="moneda" required onChange={handleSelectMonedaChange}>
          <option value="0">U$S (Dolares Americanos)</option>
          <option value="1">$ (Pesos Uruguayos)</option>
          <option value="2">€ (Euros)</option>
        </select>
        <br></br>
        <br></br>
        <label>IMPORTE A TRANSFERIR : </label>
        <input
          type="number"
          id="importe"
          required
          onChange={(e) => setValorTransaccion(e.target.value)}
        />
        <br></br>
        <br></br>
        <label>CUENTA DEL BENEFICIARIO : </label>
        <input
          type="number"
          required
          onChange={(e) => setBeneficiario(e.target.value)}
        />
        <br></br>
        <br></br>
        <label>REFERENCIA : </label>
        <input type="text" onChange={(e) => setReferencia(e.target.value)} />
        <br></br>
        <br></br>
        <input type="submit" value="CONFIRMAR"></input>
      </form>
    </div>
  );
}

export default connect()(TransactionCreation);
