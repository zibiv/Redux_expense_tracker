import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editBudget } from '../features/budgets/budgetsSlice';
import { selectTransactions } from '../features/transactions/transactionsSlice';

export default function Budget({ budget }) {
  const dispatch = useDispatch();
  //размер суммы бюджета будет управляться состоянием компонента, для того что бы иметь возможность управлять данными в input формы 
  const [amount, setAmount] = useState(budget.amount);
  //получить все транзакции, в дальнейшем будет использоваться только транзакции относящиеся к категории данного бюджета
  //transactions[budget.category]
  const transactions = useSelector(selectTransactions);

  const handleEdit = (e) => {
    //при отправке формы запускается этот обработчик он диспатчет editBudget действие с соответствующим объектом
    e.preventDefault();
    dispatch(editBudget({ category: budget.category, amount: amount }));
  };

  const calculateTotalExpenses = () => {
    return transactions[budget.category]
      .map((transaction) => transaction.amount)
      .reduce((amount1, amount2) => amount1 + amount2, 0);
  };

  //для добавления имени класса для применения подходящего стиля
  const getFundsRemainingClassName = (amount) => {
    if (parseFloat(amount) === 0) {
      return null;
    }

    return parseFloat(amount) > 0 ? 'positive' : 'negative';
  };
  
  //получение итоговой суммы бюджета после проведения транзакций
  const remainingFunds = Number.parseFloat(budget.amount - calculateTotalExpenses()).toFixed(2);
  //получение класса в зависимости от положительной или отрицательной суммы бюджета после проведения транзакций
  const fundsRemainingClassName = getFundsRemainingClassName(remainingFunds);

  return (
    <li className="budget-container">
      <div className="category-label">Category</div>{' '}
      <div className="category-wrapper">
        <h3 className="category-value">{budget.category}</h3>
        <form onSubmit={handleEdit} className="budget-form">
          <input
            className="amount-input"
            value={amount}
            onChange={(e) => setAmount(e.currentTarget.value)}
            type="number"
            step="0.01"
          />
          <button className="update-button">Update</button>
        </form>
      </div>
      <h4 className={`remaining-funds ${fundsRemainingClassName}`}>
        Funds Remaining: {remainingFunds}
      </h4>
    </li>
  );
}
