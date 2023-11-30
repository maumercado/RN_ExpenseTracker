import { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'

import Button from '../../UI/Button'
import Input from './Input'
import { getFormattedDate } from '../../util/date'
import { GlobalStyles } from '../../constants/styles'

function ExpenseForm ({ defaultValues, submitButtonLabel, onCancel, onSubmit }) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : '',
      isValid: true
    },
    date: {
      value: defaultValues?.date ? getFormattedDate(defaultValues.date) : '',
      isValid: true
    },
    description: {
      value: defaultValues ? defaultValues.description : '',
      isValid: true
    }
  })

  function inputChangeHandler (inputIdentifier, enteredValue) {
    setInputs((currInputs) => ({
      ...currInputs,
      [inputIdentifier]: { value: enteredValue, isValid: true }
    }))
  }

  function submitHandler () {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value
    }

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date'
    const descriptionIsValid = expenseData.description.trim().length > 0

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs((currInputs) => {
        return {
          amount: { value: currInputs.amount.value, isValid: amountIsValid },
          date: { value: currInputs.date.value, isValid: dateIsValid },
          description: { value: currInputs.description.value, isValid: descriptionIsValid }
        }
      })
      return
    }

    onSubmit(expenseData)
  }

  const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Expense Form</Text>
      <View style={styles.inputsRow}>
        <Input
          invalid={!inputs.amount.isValid}
          label='Amount'
          style={styles.rowInput}
          textInputConfig={
          {
            keyboardType: 'decimal-pad',
            onChangeText: inputChangeHandler.bind(this, 'amount'),
            value: inputs.amount.value
          }
        }
        />
        <Input
          invalid={!inputs.date.isValid}
          label='Date'
          style={styles.rowInput}
          textInputConfig={
          {
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, 'date'),
            value: inputs.date.value
          }
        }
        />
      </View>
      <Input
        invalid={!inputs.description.isValid}
        label='Description'
        textInputConfig={
        {
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, 'description'),
          value: inputs.description.value
        }
      }
      />
      {formIsInvalid && <Text style={styles.errorText}>Invalid input values - Please check the entered data</Text>}
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
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8
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
