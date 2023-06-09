import { createSlice } from "@reduxjs/toolkit";

export const CATEGORIES = ['housing', 'food', 'transportation', 'utilities', 'clothing', 'healthcare', 'personal', 'education', 'entertainment'];
//составляет состояние по умолчанию из массива категорий получаем массив объектов категория, кол-во средств
const initialState = CATEGORIES.map(category => ({ category: category, amount: 0 }));

const budgetsSliceOptions = {
  name: 'budgets',
  initialState: initialState,
  reducers: {
    editBudget(state, action){
      //мы имеем возможность при использовании createSlice изменять состояние слайса через мутацию
      const idxToChange = state.findIndex(budget => budget.category === action.payload.category);
      state[idxToChange].amount = action.payload.amount;
    },
  }
}

export const budgetsSlice = createSlice(budgetsSliceOptions);

export const { editBudget } = budgetsSlice.actions

//СТАРАЯ ВЕРСИЯ

// export const editBudget = (budget) => {
//   return {
//     type: 'budgets/editBudget',
//     payload: budget
//   }
// }

// const budgetsReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'budgets/editBudget':
//       const newBudgets = state.map(budget => {
//         //перебираем все бюджеты, если категория совпадает с той которая указана в действии, то для этой категории возвращаем объект из действия
//         if (budget.category === action.payload.category) {
//           return action.payload;
//         }
//         //если нет то возвращаем данный бюджет как есть
//         return budget;
//       })
//       //возвращаем обновленный массив бюджетов
//       return newBudgets;
//     default:
//       return state;
//   }
// }

export const selectBudgets = (state) => state.budgets;
export default budgetsSlice.reducer;
