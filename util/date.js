export const getFormattedDate = (date) => {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  return `${year}-${month.toString().padStart(2, '0')}-${day}`
}
