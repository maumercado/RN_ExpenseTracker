import { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'

import Button from '../../UI/Button'
import Input from './Input'
import { getFormattedDate } from '../../util/date'

function ExpenseForm ({ defaultValues, submitButtonLabel, onCancel, onSubmit }) {
  const [inputValues, setInputValues] = useState({
    amount: defaultValues?.amount?.toString() || '',
    date: defaultValues?.date ? getFormattedDate(defaultValues.date) : '',
    description: defaultValues?.description || ''
  })

  function inputChangeHandler (inputIdentifier, enteredValue) {
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [inputIdentifier]: enteredValue
    }))
  }

  function submitHandler () {
    const expenseData = {
      amount: +inputValues.amount,
      date: new Date(inputValues.date),
      description: inputValues.description
    }

    onSubmit(expenseData)
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Expense Form</Text>
      <View style={styles.inputsRow}>
        <Input
          label='Amount'
          style={styles.rowInput}
          textInputConfig={
          {
            keyboardType: 'decimal-pad',
            onChangeText: inputChangeHandler.bind(this, 'amount'),
            value: inputValues.amount
          }
        }
        />
        <Input
          label='Date'
          style={styles.rowInput}
          textInputConfig={
          {
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, 'date'),
            value: inputValues.date
          }
        }
        />
      </View>
      <Input
        label='Description'
        textInputConfig={
        {
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, 'description'),
          value: inputValues.description
        }
      }
      />
      <View style={styles.buttonsContainer}>
        <Button
          mode='flat'
          onPress={onCancel}
          style={styles.button}
        >Cancel
        </Button>
        <Button
          style={styles.button}
          onPress={submitHandler}
        >{submitButtonLabel}
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  form: {
    marginTop: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center'
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rowInput: {
    flex: 1
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8
  }
})

export default ExpenseForm
