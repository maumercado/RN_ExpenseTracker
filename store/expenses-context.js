import { createContext, useReducer } from 'react'

/* eslint-disable no-case-declarations */
export const ExpensesContext = createContext({
  expenses: [],
  setExpenses: (expenses) => {},
  addExpense: ({ description, amount, date }) => {},
  updateExpense: (id, { description, amount, date }) => {},
  deleteExpense: (id) => {}
})

function expensesReducer (state, action) {
  switch (action.type) {
    case 'SET':
      const invertedExpenses = action.payload.reverse()
      return invertedExpenses
    case 'ADD':
      return [action.payload, ...state]
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
  const [expensesState, dispatch] = useReducer(expensesReducer, [])

  function setExpenses (expenses) {
    dispatch({ type: 'SET', payload: expenses })
  }

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
        updateExpense,
        setExpenses
      }}
    >
      {children}
    </ExpensesContext.Provider>
  )
}

export default ExpensesContextProvider
