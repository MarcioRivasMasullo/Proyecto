import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import TextField from '@material-ui/core/TextField';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useState } from 'react';
import {
  getTransactions,
  GetTransactionsType,
  TransactionData,
} from '../../network/ApiClient';

function TransactionList() {
  const [fromAccountFilter, setAccountFilter] = useState<string>();
  const [currencyFilter, setCurrencyFilter] = useState<string>();

  const [transList, setTransList] = useState<TransactionData[]>([]);

  // const getPropertiesWithValue: any = (obj: filterTypes) => {
  //   const filterKeys = Object.keys(obj);
  //   let finalObject: filterTypes = {};
  //   filterKeys.map((key) => {
  //     if (obj[key as keyof typeof obj]) {
  //       finalObject[key as keyof typeof obj] = obj[key as keyof typeof obj];
  //     }
  //   });
  //   return finalObject;
  // };

  useEffect(() => {
    const authHeaders: object = {
      headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` },
    };

    let finalHeaders: object = authHeaders;
    if (fromAccountFilter !== '') {
      finalHeaders = {
        ...authHeaders,
        params: { from_account_id: fromAccountFilter },
      };
    }

    getTransactions(finalHeaders)
      .then((resp) => {
        const response: GetTransactionsType = resp.data;
        setTransList(response.data);
      })
      .catch(() => {
        console.log('Error ocurred trying to get user transactions');
      });
  }, [fromAccountFilter]);

  const accountFilterHandler = (e: any) => setAccountFilter(e.target.value);

  const currencyFilterHandler = (e: any) => setCurrencyFilter(e.target.value);

  const DebouncedCOHandler = (i: boolean) =>
    useCallback(
      debounce(i ? accountFilterHandler : currencyFilterHandler, 300),
      []
    );

  // put this in utils
  transList.map((row) => {
    row.currency_name =
      row.currency_name === 'URU'
        ? '$'
        : row.currency_name === 'USD'
        ? 'U$S'
        : '€';
  });

  const filterRows = () => {
    let filteredRows = transList;
    if (fromAccountFilter) {
      filteredRows = transList.filter((row) => {
        console.log(fromAccountFilter, row.from_account_id.toString());
        return row.from_account_id.toString().startsWith(fromAccountFilter);
      });
    }
    if (currencyFilter) {
      filteredRows = filteredRows.filter((row) => {
        return row.currency_name.startsWith(currencyFilter);
      });
    }
    return filteredRows;
  };

  const rows: GridRowsProp = filterRows();

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', hide: true },
    { field: 'from_account_id', headerName: 'ORIGIN ACCOUNT', width: 180 },
    { field: 'to_account_id', headerName: 'RECIEVER ACCOUNT', width: 180 },
    { field: 'currency_name', headerName: 'CURRENCY', width: 110 },
    { field: 'amount', headerName: 'AMOUNT', width: 160 },
    { field: 'description', headerName: 'DESCRIPTION', width: 180 },
    { field: 'createdAt', headerName: 'DATE', width: 180 },
  ];

  return (
    <div>
      <div>
        <TextField
          id="standard-basic"
          label="ORIGIN ACCOUNT"
          variant="standard"
          style={{ padding: '8px' }}
          onChange={DebouncedCOHandler(true)}
        />

        <TextField
          id="standard-basic"
          label="CURRENCY"
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
