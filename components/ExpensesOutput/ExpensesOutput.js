import { View, StyleSheet } from 'react-native'

import ExpensesList from './ExpensesList'
import ExpensesSummary from './ExpensesSummary'
import { GlobalStyles } from '../../constants/styles'

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'Car Insurance',
    amount: 294.67,
    date: new Date('2021-04-12')
  },
  {
    id: 'e2',
    description: 'New Desk (Wooden)',
    amount: 450,
    date: new Date('2021-04-02')
  },
  {
    id: 'e3',
    description: 'Toilet Paper',
    amount: 94.12,
    date: new Date('2021-03-28')
  },
  {
    id: 'e4',
    description: 'New TV',
    amount: 799.49,
    date: new Date('2021-03-25')
  }
]

function ExpensesOutput ({ expenses, expensesPeriod }) {
  return (
    <View style={styles.container}>
      <ExpensesSummary periodName={expensesPeriod} expenses={DUMMY_EXPENSES} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700
  }
})

export default ExpensesOutput
