import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import TextField from '@material-ui/core/TextField';
import debounce from 'lodash.debounce';
import { useCallback, useState } from 'react';

function TransactionList() {
  const [cuentaFilter, setCuentaFilter] = useState<string>();
  const [monedaFilter, setMonedaFilter] = useState<string>();

  const transactionList = useSelector(
    ({ transactionReducer }: RootState) => transactionReducer.transactions
  );

  const CuentaFilterHandler = (e: any) => setCuentaFilter(e.target.value);

  const MonedaFilterHandler = (e: any) => setMonedaFilter(e.target.value);

  const DebouncedCOHandler = (i: boolean) =>
    useCallback(
      debounce(i ? CuentaFilterHandler : MonedaFilterHandler, 300),
      []
    );

  const filterRows = () => {
    let filteredRows = transactionList;
    if (cuentaFilter) {
      filteredRows = transactionList.filter((row) => {
        return row.cuentaOrigen
          ? row.cuentaOrigen.startsWith(cuentaFilter)
          : true;
      });
    }
    if (monedaFilter) {
      filteredRows = filteredRows.filter((row) => {
        return row.moneda!.startsWith(monedaFilter);
      });
    }
    return filteredRows;
  };

  const rows: GridRowsProp = filterRows();

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', hide: true },
    { field: 'cuentaOrigen', headerName: 'CUENTA ORIGEN', width: 180 },
    { field: 'beneficiario', headerName: 'CUENTA DESTINO', width: 180 },
    { field: 'moneda', headerName: 'MONEDA', width: 110 },
    { field: 'valorTransaccion', headerName: 'MONTO', width: 160 },
    { field: 'referencia', headerName: 'REFERENCIA', width: 180 },
  ];

  return (
    <div>
      <div>
        <TextField
          id="standard-basic"
          label="CUENTA ORIGEN"
          variant="standard"
          style={{ padding: '8px' }}
          onChange={DebouncedCOHandler(true)}
        />

        <TextField
          id="standard-basic"
          label="MONEDA"
          variant="standard"
          style={{ padding: '8px' }}
          onChange={DebouncedCOHandler(false)}
        />
      </div>
      <div style={{ height: '420px', width: '100%' }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </div>
  );
}

export default TransactionList;
