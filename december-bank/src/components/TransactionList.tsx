import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { randomInt } from 'crypto';

function TransactionList() {
  const transactionList = useSelector(
    ({ transactionReducer }: RootState) => transactionReducer.transactions
  );
  console.log(transactionList);

  const rows: GridRowsProp = transactionList;

  // [
  //   {
  //     id: 1,
  //     cuentaOrigen: '12335',
  //     beneficiario: '322',
  //     moneda: '$',
  //     valorTransaccion: '2332',
  //     referencia: '466',
  //   },
  //   {
  //     id: 2,
  //     cuentaOrigen: '12335',
  //     beneficiario: '322',
  //     moneda: '$',
  //     valorTransaccion: '23222132',
  //     referencia: '466',
  //   },
  //   {
  //     id: 3,
  //     cuentaOrigen: '12335',
  //     beneficiario: '322',
  //     moneda: '$',
  //     valorTransaccion: '222332',
  //     referencia: '46jsbsdjbjbkjdbdhjdjvdjdv6',
  //   },
  // ];

  const columns: GridColDef[] = [
    { field: 'id', hide: true },
    { field: 'cuentaOrigen', headerName: 'CUENTA ORIGEN', width: 170 },
    { field: 'beneficiario', headerName: 'CUENTA DESTINO', width: 170 },
    { field: 'moneda', headerName: 'MONEDA', width: 100 },
    { field: 'valorTransaccion', headerName: 'MONTO', width: 150 },
    { field: 'referencia', headerName: 'REFERENCIA', width: 170 },
  ];

  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}

export default TransactionList;
