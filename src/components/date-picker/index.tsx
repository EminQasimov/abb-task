import React, { useState } from "react"
import moment, { Moment } from "moment"
import Calendar from "rc-calendar"
import { default as RCDatePicker } from "rc-calendar/lib/Picker"
import enUS from "rc-calendar/src/locale/en_US"
import { readableDateFormat } from "utils"

import "rc-calendar/assets/index.css"
import styles from "./date-picker.module.scss"

import "moment/locale/en-gb"
import { Input } from "components/input"

const multiFormats = ["DD/MM/YYYY", "DD/MM/YY", "DDMMYY", "D/M/YY"]

const now = moment()

const defaultCalendarValue = now.clone()
defaultCalendarValue.add(-1, "month")

export function DatePicker(props: { any }) {
  const [state, setState] = useState({ value: now })

  function onChange(value: Moment) {
    setState({
      value,
    })
  }

  function disabledDate(current: Moment | undefined) {
    if (!current) {
      return false // allow empty select
    }

    const date = moment()
    date.hour(0)
    date.minute(0)
    date.second(0)
    // can not select days after today/birdthdate
    return current.valueOf() > date.valueOf()
  }

  const calendar = (
    <Calendar
      style={{ zIndex: 1001 }}
      dateInputPlaceholder="Enter date"
      format={multiFormats}
      defaultValue={defaultCalendarValue}
      showDateInput={true}
      showToday={false}
      disabledDate={disabledDate}
      //   focusablePanel={false}
    />
  )

  return (
    <RCDatePicker
      calendar={calendar}
      value={state.value}
      onChange={onChange}
      style={{ zIndex: 1001 }}
      // onOpenChange={this.onOpenChange}
      // open={state.open}
      // animation="slide-up"
    >
      {({ value }: { value: Moment }) => {
        return (
          <Input
            placeholder="Enter date"
            readOnly
            className={styles.input}
            value={(value && value.format(readableDateFormat)) || ""}
          />
        )
      }}
    </RCDatePicker>
  )
}
