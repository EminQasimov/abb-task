import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'

const readableDateFormat = 'MMM d, yyyy'

export default function formatDate(date: string) {
  let readableDate = date
  // console.log(date)

  try {
    readableDate = format(parseISO(date), readableDateFormat)
  } catch (error) {
    console.log('wrong date format')
  }

  // console.log(readableDate)

  return readableDate
}
