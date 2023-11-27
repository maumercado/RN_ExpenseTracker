import { View } from 'react-native'
import Input from './Input'

function ExpenseForm () {
  function amountChangeHandler () {
    console.log('amount changed')
  }

  return (
    <View>
      <Input
        label='Amount'
        textInputConfig={
        {
          keyboardType: 'decimal-pad',
          onChangeText: amountChangeHandler
        }
      }
      />
      <Input
        label='Date'
        textInputConfig={
        {
          placeholder: 'YYYY-MM-DD',
          maxLength: 10,
          onChangeText: () => console.log('date changed')
        }
      }
      />
      <Input
        label='Description'
        textInputConfig={
        {
          multiline: true,
          onChangeText: () => console.log('description changed')
        }
      }
      />
    </View>
  )
}

export default ExpenseForm
