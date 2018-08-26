import { FETCH_RECORDS } from '../actions/type.js';

const INITIAL_STATE = {
  expenses: null
}

export const expensesReducer = (state = INITIAL_STATE.expenses, action) => {
  switch (action.type) {
    case FETCH_RECORDS:
      return action.records
    default:
      return state;

  }
}
