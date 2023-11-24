import { View, Text } from 'react-native'

function ExpensesSummary ({ expenses, periodName }) {
  const expensesTotal = expenses.reduce((acc, expense) => {
    return acc + expense.amount
  }, 0)

  return (
    <View>
      <Text>{periodName}</Text>
      <Text>${expensesTotal.toFixed(2)}</Text>
    </View>
  )
}

export default ExpensesSummary
