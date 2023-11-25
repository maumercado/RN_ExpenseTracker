import { createContext, useReducer } from 'react'

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'Car Insurance',
    amount: 294.67,
    date: new Date('2023-04-12')
  },
  {
    id: 'e2',
    description: 'New Desk (Wooden)',
    amount: 450,
    date: new Date('2023-04-02')
  },
  {
    id: 'e3',
    description: 'Toilet Paper',
    amount: 94.12,
    date: new Date('2023-11-20')
  },
  {
    id: 'e4',
    description: 'New TV',
    amount: 799.49,
    date: new Date('2023-11-21')
  }
]

/* eslint-disable no-case-declarations */
export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  updateExpense: (id, { description, amount, date }) => {},
  deleteExpense: (id) => {}
})

function expensesReducer (state, action) {
  switch (action.tyoe) {
    case 'ADD':
      const id = new Date().getTime().toString() + Math.random().toString()
      return [{ ...action.payload, id }, ...state]
    case 'UPDATE':
      const updatedExpenseIndex = state.findIndex(expense => expense.id === action.payload.id)
      const udpatableExpense = state[updatedExpenseIndex]
      const updatedExpense = { ...udpatableExpense, ...action.payload.data }
      const updatedExpenses = [...state]
      updatedExpenses[updatedExpenseIndex] = updatedExpense
      return updatedExpenses
    case 'DELETE':
      return state.filter(expense => expense.id !== action.payload)
    default:
      return state
  }
}

function ExpensesContextProvider ({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES)

  function addExpense (expenseData) {
    dispatch({ type: 'ADD', payload: expenseData })
  }

  function deleteExpense (id) {
    dispatch({ type: 'DELETE', payload: id })
  }

  function updateExpense (id, expenseData) {
    dispatch({ type: 'UPDATE', payload: { id, data: expenseData } })
  }

  return (
    <ExpensesContext.Provider
      value={{
        expenses: expensesState,
        addExpense,
        deleteExpense,
        updateExpense
      }}
    >
      {children}
    </ExpensesContext.Provider>
  )
}

export default ExpensesContextProvider
