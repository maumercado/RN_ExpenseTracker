import { View, Text, Pressable, StyleSheet } from 'react-native'
import { GlobalStyles } from '../../constants/styles'

function ExpenseItem ({ description, amount, date }) {
  return (
    <Pressable>
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>{description}</Text>
          <Text style={styles.textBase}>{date.toString()}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{amount}</Text>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 4,
    shadowOpacity: 0.4
  },
  textBase: {
    color: GlobalStyles.colors.primary50
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: 'bold'
  }
})

export default ExpenseItem