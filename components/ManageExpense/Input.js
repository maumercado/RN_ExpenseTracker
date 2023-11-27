import { Text, TextInput, View, StyleSheet } from 'react-native'
import { GlobalStyles } from '../../constants/styles'

function Input ({ label, textInputConfig }) {
  const inputStyle = [styles.input]

  if (textInputConfig.multiline) {
    inputStyle.push(styles.inputMultiline)
  }

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={inputStyle}
        {...textInputConfig}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.primary700
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top'
  }
})

export default Input
