import { useLayoutEffect, useContext } from 'react'
import { View, StyleSheet } from 'react-native'

import { GlobalStyles } from '../constants/styles'
import { ExpensesContext } from '../store/expenses-context'

import ExpenseForm from '../components/ManageExpense/ExpenseForm'

import IconButton from '../UI/IconButton'

function ManageExpense ({ route, navigation }) {
  const expensesCtx = useContext(ExpensesContext)
  const expenseId = route.params?.expenseId
  const isEditing = !!expenseId
  const selectedExpense = expensesCtx.expenses.find((expense) => expense.id === expenseId)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    })
  }, [navigation, isEditing])

  function deleteExpenseHandler () {
    expensesCtx.deleteExpense(expenseId)
    navigation.goBack()
  }

  function cancelHandler () {
    navigation.goBack()
  }

  function confirmHandler (expenseData) {
    if (isEditing) {
      expensesCtx.updateExpense(expenseId, expenseData)
    } else {
      expensesCtx.addExpense(expenseData)
    }
    navigation.goBack()
  }

  return (
    <View
      style={styles.container}
    >
      <ExpenseForm
        defaultValues={selectedExpense}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
      />
      {isEditing &&
        <View
          style={styles.deleteContainer}
        >
          <IconButton
            icon='trash'
            size={24}
            color={GlobalStyles.colors.error500}
            onPress={deleteExpenseHandler}
          />
        </View>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
  }
})

export default ManageExpense
