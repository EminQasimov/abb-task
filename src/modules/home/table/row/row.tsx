import React from "react"
import { Employee } from "types/employee"
import { BirthDateTd, PhoneTd, SharedTd, DeleteTd } from "./cells"

import styles from "../table.module.scss"

type RowProps = {
  employee: Employee
  search?: string | undefined
  loadTable: () => void
  deleted: boolean
}

export const Row = (props: RowProps) => {
  const { employee, search, deleted, loadTable } = props
  const { id, name, surname, birthDate, position, phone } = employee

  const sharedProps = {
    search,
    loadTable,
    deleted,
    id,
  }

  return (
    <tr className={deleted ? styles.deleted : ""}>
      <td>
        <span className={styles.idColCell}>{id}</span>
      </td>

      <SharedTd field="name" initialValue={name} {...sharedProps} />
      <SharedTd field="surname" initialValue={surname} {...sharedProps} />
      <BirthDateTd birthDate={birthDate} />
      <SharedTd field="position" initialValue={position} {...sharedProps} />
      <SharedTd field="phone" initialValue={phone} {...sharedProps} />
      <DeleteTd {...sharedProps} />
    </tr>
  )
}
