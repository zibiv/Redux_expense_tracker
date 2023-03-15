import React from 'react';
import { useSelector } from 'react-redux';
import { selectFlattenedTransactions } from './transactionsSlice';
import TransactionForm from '../../components/TransactionForm';
import TransactionList from '../../components/TransactionList';

const Transactions = () => {
  //получение всех транзакций одним массивом
  const transactions = useSelector(selectFlattenedTransactions);
  return (
    <div className="comments-container">
      <TransactionList transactions={transactions} />
      <TransactionForm />
    </div>
  );
};

export default Transactions;
