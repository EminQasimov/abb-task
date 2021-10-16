import moment from "moment"

export const readableDateFormat = "MMM D, YYYY"

export function formatDate(date: string) {
  let readableDate = date
  console.log(date)

  try {
    readableDate = moment(date).format(readableDateFormat)
  } catch (error) {
    console.log("wrong date format")
  }

  console.log(readableDate)

  return readableDate
}
