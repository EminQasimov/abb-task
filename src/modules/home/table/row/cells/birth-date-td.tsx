import React from "react"
// import { Calendar } from "primereact/calendar"
import { InlineForm } from "components/inline-form"
import { formatDate } from "utils"
import { DateIcon } from "assets/icons"
import { DatePicker } from "components/date-picker"

import styles from "../../table.module.scss"

export const BirthDateTd = (props: { birthDate: string }) => {
  const { birthDate } = props

  return (
    <td>
      <InlineForm
        viewMode={
          <div className={styles.cellViewMode}>
            <DateIcon fontSize={20} />
            {formatDate(birthDate)}
          </div>
        }
        renderEditMode={() => <DatePicker />}
        onSubmit={() => {}}
        onCancel={() => {}}
      />
    </td>
  )
}
