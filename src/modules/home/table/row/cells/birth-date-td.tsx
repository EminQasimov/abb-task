import { InlineForm, DatePicker } from "components"
import { StringSchema } from "yup"
import { readableDateFormat } from "utils"
import moment from "moment"
import { DateIcon } from "assets/icons"
import useCellState from "./use-cell-state"

import { SharedProps } from "."

import styles from "../../table.module.scss"

export const BirthDateTd = (props: SharedProps) => {
  const { initialValue } = props
  const { value, setValue, handleSubmit, handleCancel, errors } = useCellState({
    ...props,
    initialValue: moment(initialValue).format(),
  })
  const formatedValue = moment(value).format(readableDateFormat)

  return (
    <td>
      <InlineForm
        viewMode={
          <div className={styles.cellViewMode}>
            <DateIcon fontSize={20} />
            {formatedValue}
          </div>
        }
        renderEditMode={() => (
          <DatePicker
            value={moment(value)}
            onChange={(value) => setValue(value ? value.format() : "")}
            errors={errors}
          />
        )}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </td>
  )
}
