import React, { createContext, useReducer } from "react";

// 5. The reducer - this is used to update the state, based on the action
export const AppReducer = (state, action) => {
  let new_expenses = [];
  switch (action.type) {
    case "CHG_BUDGET":
        if(action.payload>=state.spended)
        {   
            state.Budget = action.payload;
        }
        else{
            alert("You cannot reduce the budget value lower than the spending");
        }
      return {
        ...state,
      };

    case "ADD_ALLOBUDGET":
      state.expenses.map((expense) => {
        if (expense.name === action.payload.name) {
            if(state.remaning>=action.payload.allocatedbudget)
            {
                expense.allocatedbudget = expense.allocatedbudget + action.payload.allocatedbudget;
                state.remaning = state.remaning - action.payload.allocatedbudget;
            }
            else{
                alert(`The value cannot exceed remaining funds ${state.currency}${state.remaning}`);
            }
        }
        new_expenses.push(expense);
        return true;
      });
      state.expenses = new_expenses;
      action.type = "DONE";
      return {
        ...state,
      };
    case "RED_ALLOBUDGET":
      state.expenses.map((expense) => {
        if (expense.name === action.payload.name) {
            if(expense.allocatedbudget>=action.payload.allocatedbudget)
            {
                expense.allocatedbudget = expense.allocatedbudget- action.payload.allocatedbudget;
                state.remaning = state.remaning + action.payload.allocatedbudget;
            }
            else{
                state.remaning = state.remaning + expense.allocatedbudget;
                expense.allocatedbudget = 0;
            }
        }
        new_expenses.push(expense);
        return true;
      });
      state.expenses = new_expenses;
      action.type = "DONE";
      return {
        ...state,
      };

    case "DELETE_ITEM":
      state.expenses.map((expense) => {
        if (expense.name === action.payload.name) {
          expense.allocatedbudget = 0;
        }
        new_expenses.push(expense);
        return true;
      });
      state.expenses = new_expenses;
      action.type = "DONE";
      return {
        ...state,
      };
    case "INCREMENT10":
        state.expenses.map((expense) => {
            if (expense.name === action.payload.name) {
                if(state.remaning>=10)
                {
                    expense.allocatedbudget = expense.allocatedbudget + 10;
                    state.remaning = state.remaning - 10;
                }
            }
            new_expenses.push(expense);
            return true;
          });
          state.expenses = new_expenses;
          action.type = "DONE";
          return {
            ...state,
          };

    case "DECREMENT10":
        state.expenses.map((expense) => {
            if (expense.name === action.payload.name) {
                if (expense.name === action.payload.name) {
                    if(expense.allocatedbudget>=10)
                    {
                        expense.allocatedbudget = expense.allocatedbudget - 10;
                        state.remaning = state.remaning + 10;
                    }
                    else{
                        state.remaning = state.remaning + expense.allocatedbudget;
                        expense.allocatedbudget = 0;
                    }
                }
              }
              expense.quantity = expense.allocatedbudget < 0 ? 0 : expense.allocatedbudget;
            new_expenses.push(expense);
            return true;
          });
          state.expenses = new_expenses;
          action.type = "DONE";
          return {
            ...state,
          };

    case "CHG_CURRENCY":
      action.type = "DONE";
      state.currency = action.payload;
      return {
        ...state,
      };
    default:
      return state;
  }
};

// 1. Sets the initial state when the app loads
const initialState = {
  expenses: [
    { id: "Marketing", name: "Marketing", allocatedbudget: 50 },
    { id: "Finance", name: "Finance", allocatedbudget: 300 },
    { id: "Sales", name: "Sales", allocatedbudget: 70 },
    { id: "Human Resource", name: "Human Resource", allocatedbudget: 40 },
    { id: "IT", name: "IT", allocatedbudget: 500 },
  ],
  Budget: 2000,
  currency: "£",
};

// 2. Creates the context this is the thing our components import and use to get the state
export const AppContext = createContext();

// 3. Provider component - wraps the components we want to give access to the state
// Accepts the children, which are the nested(wrapped) components
export const AppProvider = (props) => {
  // 4. Sets up the app state. takes a reducer, and an initial state
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const totalExpenses = state.expenses.reduce((total, expense) => {
    return (total = total + expense.allocatedbudget);
  }, 0);
  state.spended = totalExpenses;

  const totalRemaining = state.expenses.reduce((remaining, expense) => {
    return remaining - expense.allocatedbudget;
}, state.Budget);
  state.remaning = totalRemaining;

  return (
    <AppContext.Provider
      value={{
        expenses: state.expenses,
        Budget: state.Budget,
        spended: state.spended,
        remaning: state.remaning,
        dispatch,
        currency: state.currency,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
