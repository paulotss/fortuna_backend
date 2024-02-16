function convertDateToUTC(date: Date, reset = true): Date {
  const utc = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    reset ? 0 : 23,
    reset ? 0 : 59,
    reset ? 0 : 999
  )
  return new Date(utc)
}

export default convertDateToUTC