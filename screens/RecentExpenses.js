import { useContext } from 'react'
import { ExpensesContext } from '../store/expenses-context'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { getDateMinusDays } from '../util/date'

function RecentExpenses () {
  const expensesCtx = useContext(ExpensesContext)
  const recentExpenses = expensesCtx.expenses.filter(expense => {
    const currentDate = new Date()
    const dateMinus7Days = getDateMinusDays(currentDate, 7)
    return expense.date >= dateMinus7Days && expense.date <= currentDate
  })

  return (
    <ExpensesOutput expenses={recentExpenses} expensesPeriod='Recent' fallbackText='No Recent Expenses Found' />
  )
}

export default RecentExpenses
