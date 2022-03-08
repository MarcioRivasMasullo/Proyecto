import { confirm } from 'react-confirm-box';

const displayConfirmBox = async () => {
  const result = await confirm('DESEA CONFIRMAR LA TRANSACCION?');
  // if (result) {
  //   console.log('You click yes!');
  //   return;
  // }
  // console.log('You click No!');
};

const addDots = (event: any) => {};

function TransactionCreation() {
  return (
    <div>
      <form onSubmit={displayConfirmBox}>
        <label>CUENTA DE ORIGEN :</label>
        <select id="cuentaOrigen" required>
          <option value="">Cuenta 12334 (Saldo $ 500.00)</option>
          <option value="">Cuenta 12335 (Saldo U$S 5000.00)</option>
          <option value="">Cuenta 12336 (Saldo € 5000.00)</option>
        </select>
        <br></br>
        <br></br>
        <label>MONEDA :</label>
        <select id="cuentaOrigen" required>
          <option value="">U$S (Dolares Americanos)</option>
          <option value="">$ (Pesos Uruguayos)</option>
          <option value="">€ (Euros)</option>
        </select>
        <br></br>
        <br></br>
        <label>IMPORTE A TRANSFERIR : </label>
        <input type="number" id="importe" required />
        <br></br>
        <br></br>
        <label>CUENTA DEL BENEFICIARIO : </label>
        <input type="number" required />
        <br></br>
        <br></br>
        <label>REFERENCIA : </label>
        <input type="text" />
        <br></br>
        <br></br>
        <input type="submit" value="CONFIRMAR"></input>
      </form>
    </div>
  );
}

export default TransactionCreation;
