export const formatCurrency = (value, locale = 'en-US', style = 'currency', currency = 'USD') => {
  const formattedValue = value.toLocaleString(locale, {
    style: style,
    currency: currency
  })
  return formattedValue
}
