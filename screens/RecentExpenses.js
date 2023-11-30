import { useContext, useEffect, useState } from 'react'
import { ExpensesContext } from '../store/expenses-context'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { getDateMinusDays } from '../util/date'
import { fetchExpenses } from '../util/http'
import LoadingOverlay from '../UI/LoadingOverlay'
import ErrorOverlay from '../UI/ErrorOverlay'

function RecentExpenses () {
  const expensesCtx = useContext(ExpensesContext)
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState()

  useEffect(() => {
    async function getExpenses () {
      try {
        const expenses = await fetchExpenses()
        expensesCtx.setExpenses(expenses)
      } catch (err) {
        setError(err.message)
      }
      setIsFetching(false)
    }
    getExpenses()
  }, [])

  if (error && !isFetching) {
    <ErrorOverlay message={error} />
  }

  if (isFetching) {
    return <LoadingOverlay />
  }

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
