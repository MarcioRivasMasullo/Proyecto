export interface Transaction {
  id?: string;
  cuentaOrigen?: string;
  moneda?: string;
  valorTransaccion?: string;
  beneficiario?: string;
  referencia?: string;
}

export function CreateTransaction(transaction: Transaction) {
  return { type: CREATE_TRANSACTION, transaction };
}

export const CREATE_TRANSACTION = 'CREATE_TRANSACTION';
