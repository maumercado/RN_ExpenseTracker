import { useLayoutEffect, useContext, useState } from 'react'
import { View, StyleSheet } from 'react-native'

import { deleteExpense, storeExpense, updateExpense } from '../util/http'

import { GlobalStyles } from '../constants/styles'
import { ExpensesContext } from '../store/expenses-context'

import ExpenseForm from '../components/ManageExpense/ExpenseForm'
import IconButton from '../UI/IconButton'
import LoadingOverlay from '../UI/LoadingOverlay'
import ErrorOverlay from '../UI/ErrorOverlay'

function ManageExpense ({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState()
  const expensesCtx = useContext(ExpensesContext)
  const expenseId = route.params?.expenseId
  const isEditing = !!expenseId
  const selectedExpense = expensesCtx.expenses.find((expense) => expense.id === expenseId)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    })
  }, [navigation, isEditing])

  async function deleteExpenseHandler () {
    setIsSubmitting(true)
    try {
      await deleteExpense(expenseId)
      expensesCtx.deleteExpense(expenseId)
      navigation.goBack()
    } catch (err) {
      setError(err.message)
      setIsSubmitting(false)
    }
  }

  function cancelHandler () {
    navigation.goBack()
  }

  async function confirmHandler (expenseData) {
    setIsSubmitting(true)
    try {
      if (isEditing) {
        expensesCtx.updateExpense(expenseId, expenseData)
        await updateExpense(expenseId, expenseData)
      } else {
        const id = await storeExpense(expenseData)
        expensesCtx.addExpense({ ...expenseData, id })
      }
      navigation.goBack()
    } catch (error) {
      setError(error.message)
      setIsSubmitting(false)
    }
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} />
  }

  if (isSubmitting) {
    return <LoadingOverlay />
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
