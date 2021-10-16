import moment from "moment"

export const readableDateFormat = "MMM D, YYYY"

export function formatDate(date: string) {
  let readableDate = date

  try {
    readableDate = moment(date).format(readableDateFormat)
  } catch (error) {
    console.log("wrong date format")
  }

  return readableDate
}
