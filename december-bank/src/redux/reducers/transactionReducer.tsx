import { Transaction } from '../actions/transactionAction';

interface ActionType {
  type: string;
  transaction: Transaction;
}

interface TransactionList {
  transactions: Transaction[];
}

const emptyArray = Array<Transaction>();

export default function transactionReducer(
  state: TransactionList = { transactions: emptyArray },
  action: ActionType
): TransactionList {
  switch (action.type) {
    case 'CREATE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.concat(action.transaction),
      };
    default:
      return state;
  }
}
