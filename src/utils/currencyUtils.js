export const formatCurrency = (
  value,
  locale = 'en-US',
  currency = 'EUR',
  minimumFractionDigits = 2,
  maximumFractionDigits = 6
) => {
  const formattedValue = value.toLocaleString(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: minimumFractionDigits,
    maximumFractionDigits: maximumFractionDigits
  })
  return formattedValue
}
