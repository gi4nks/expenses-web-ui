

import { ExpensesState } from "../store/Store";
import { AppAction } from "../actions/AppAction";
import { ExpensesActions } from "../actions/ExpensesAction";
import { getType } from "typesafe-actions";
import { Expense } from "../types/Expense";
import { MILLISECONDS } from "../types/Common";

export const EXPENSES_INITIAL_STATE: ExpensesState = {
    expenses:[],
    pollInterval: 0
}


const expensesReducer = (state: ExpensesState = EXPENSES_INITIAL_STATE, 
    action: AppAction):ExpensesState => {
  const newState: ExpensesState = {
    ...state
  };
  switch (action.type) {
    case getType(ExpensesActions.fetchActionSuccess):
      newState.expenses = action.payload as Array<Expense>; 
      newState.pollInterval = 5 * MILLISECONDS;
      break;
    
    case getType(ExpensesActions.fetchError):
      newState.expenses = []
      newState.pollInterval = 15 * MILLISECONDS;
      break;

    default:
      break;

  }

  return newState;
}

export default expensesReducer;