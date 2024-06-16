export function compareTime(dateString) {
  const pastDate = new Date(dateString)
  const now = new Date()

  const timeDifferenceInMilliseconds = now - pastDate
  const secondsPassed = Math.floor(timeDifferenceInMilliseconds / 1000)
  const minutesPassed = Math.floor(secondsPassed / 60)
  const hoursPassed = Math.floor(minutesPassed / 60)
  const daysPassed = Math.floor(hoursPassed / 24)
  const monthsPassed = Math.floor(daysPassed / 30)
  const yearsPassed = Math.floor(daysPassed / 365)

  const timeUnits = [
    { value: yearsPassed, singular: 'ano', plural: 'anos' },
    { value: monthsPassed, singular: 'mês', plural: 'meses' },
    { value: daysPassed, singular: 'dia', plural: 'dias' },
    { value: hoursPassed, singular: 'hora', plural: 'horas' },
    { value: minutesPassed, singular: 'minuto', plural: 'minutos' },
    { value: secondsPassed, singular: 'segundo', plural: 'segundos' }
  ]

  for (const unit of timeUnits) {
    if (unit.value > 0) {
      return `${unit.value} ${unit.value > 1 ? unit.plural : unit.singular} atrás`
    }
  }

  return 'agora mesmo'
}
