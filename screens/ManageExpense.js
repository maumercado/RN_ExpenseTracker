import { useLayoutEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import IconButton from '../UI/IconButton'
import { GlobalStyles } from '../constants/styles'
import Button from '../UI/Button'

function ManageExpense ({ route, navigation }) {
  const expenseId = route.params?.expenseId
  const isEditing = !!expenseId

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    })
  }, [navigation, isEditing])

  function cancelHandler () {
  }

  function confirmHandler () {
  }

  return (
    <View
      style={styles.container}
    >
      <View style={styles.buttonsContainer}>
        <Button
          mode='flat'
          onPress={cancelHandler}
          style={styles.button}
        >Cancel
        </Button>
        <Button
          style={styles.button}
          onPress={confirmHandler}
        >{isEditing ? 'Update' : 'Add'}
        </Button>
      </View>
      {isEditing &&
        <View
          style={styles.deleteContainer}
        >
          <IconButton
            icon='trash'
            size={24}
            color={GlobalStyles.colors.error500}
            onPress={() => {}}
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
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8
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
