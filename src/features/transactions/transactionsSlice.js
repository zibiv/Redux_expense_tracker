import { createSlice } from '@reduxjs/toolkit';

export const CATEGORIES = ['housing', 'food', 'transportation', 'utilities', 'clothing', 'healthcare', 'personal', 'education', 'entertainment'];
//создание объекта который будет содержать ключ - название категории, значение - пустой массив, в дальнейшем в таких массивах будут хранится объекты транзакций
const initialState = Object.fromEntries(CATEGORIES.map(category => [category, []]))

const transactionsSliceOptions = {
  name: 'transactions',
  initialState: initialState,
  reducers: {
    addTransaction(state, action){
      state[action.payload.category].push(action.payload);
    }, 
    deleteTransaction(state, action){
      state[action.payload.category] = state[action.payload.category].filter(transaction => transaction.id !== action.payload.id);
    }
  }
}


export const selectTransactions = (state) => state.transactions;
//получение массива со всеми транзакциями которые есть
export const selectFlattenedTransactions = (state) => Object.values(state.transactions).reduce((a,b) => [...a, ...b], []);

const transactionsSlice = createSlice(transactionsSliceOptions);

export const { addTransaction,  deleteTransaction} = transactionsSlice.actions;

export default transactionsSlice.reducer;

//ПРОШЛЫЙ ВАРИАНТ
// export const addTransaction = (transaction) => {
//   return {
//     type: 'transactions/addTransaction',
//     payload: transaction
//   }
// }

// export const deleteTransaction = (transaction) => {
//   return {
//     type: 'transactions/deleteTransaction',
//     payload: transaction
//   }
// }

// export const selectTransactions = (state) => state.transactions;
// //получение массива со всеми транзакциями которые есть
// export const selectFlattenedTransactions = (state) => Object.values(state.transactions).reduce((a,b) => [...a, ...b], []);

// const transactionsReducer = (state = initialState, action) => {
//   let newTransactionsForCategory;
//   switch (action.type) {
//     case 'transactions/addTransaction':
//       //создание новой транзакции - деструктуризация всех транзакций данной категории, добавление новой транзакции в новый массив
//       newTransactionsForCategory = [...state[action.payload.category].slice(), action.payload]
//       //собираем новый объект транзакций обновляя массив для данной категории
//       return { ...state, [action.payload.category]: newTransactionsForCategory}
//     case 'transactions/deleteTransaction':
//       const deletedIndex = state[action.payload.category].findIndex(transaction => transaction.id === action.payload.id);
//       newTransactionsForCategory = state[action.payload.category].filter((item, index) => index !== deletedIndex)
//       return { ...state, [action.payload.category]: newTransactionsForCategory}
//     default:
//       return state;
//   }
// }

// export default transactionsReducer;
