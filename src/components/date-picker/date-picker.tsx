// @ts-ignore
import { default as RCDatePicker } from 'rc-calendar/lib/Picker'
import { useState } from 'react'
import { Moment } from 'moment'
import Calendar from 'rc-calendar'

import { Input } from 'components'
import { readableDateFormat } from 'utils'

import 'rc-calendar/assets/index.css'
import styles from './date-picker.module.scss'

const multiFormats = ['DD/MM/YYYY', 'DD/MM/YY', 'DDMMYY', 'D/M/YY']

type DateProps = {
  value: Moment
  onChange: (value: Moment) => void
  errors: string[]
}

export function DatePicker(props: DateProps) {
  const { value, onChange, errors } = props
  const [opened, setOpened] = useState(false)

  const calendar = (
    <Calendar
      style={{ zIndex: 1001 }}
      dateInputPlaceholder="Enter date"
      format={multiFormats}
      showDateInput={true}
      showToday={false}
      className={styles.datepicker}
      // @ts-ignore
      clearIcon={() => null}
    />
  )

  const onOpenChange = (open: boolean) => {
    setOpened(open)
  }

  return (
    <RCDatePicker
      calendar={calendar}
      value={value}
      onChange={onChange}
      open={opened}
      onOpenChange={onOpenChange}
      style={{ zIndex: 1001 }}
    >
      {({ value }: { value: Moment }) => {
        return (
          <Input
            placeholder="Enter date"
            autoFocus
            onFocus={() => setOpened(true)}
            className={styles.input}
            value={(value && value.format(readableDateFormat)) || ''}
            errors={errors}
          />
        )
      }}
    </RCDatePicker>
  )
}
