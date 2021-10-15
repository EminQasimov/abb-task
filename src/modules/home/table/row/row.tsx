import React from "react"
import { Employee } from "types/employee"
import useFetch from "hooks/use-fetch"
import { BirthDateTd, PhoneTd, SharedTd } from "./cells"

import styles from "../table.module.scss"

type RowProps = {
  employee: Employee
  search?: string
  loadTable: () => void
  deleted: boolean
}

export const Row = (props: RowProps) => {
  const { employee, deleted, loadTable } = props
  const { id, name, surname, birthDate, position, phone } = employee

  const { refetch: removeEmployee } = useFetch({
    url: `/api/employees/${id}`,
    fetchOptions: {
      method: "DELETE",
    },
    onSuccess: () => {
      loadTable()
    },
  })

  const { refetch: undoEmployee } = useFetch({
    url: `/api/employees/undo/${id}`,
    fetchOptions: {
      method: "POST",
    },
    onSuccess: () => {
      loadTable()
    },
  })

  const sharedProps = {
    search: props.search as string,
    reload: loadTable,
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
      <PhoneTd phone={phone} />

      <td className={styles.lastCell}>
        <button
          className={`${styles.button} ${
            deleted ? styles.undoButton : styles.deleteButton
          }`}
          onClick={() => {
            if (deleted) {
              undoEmployee()
            } else {
              removeEmployee()
            }
          }}
        >
          {deleted ? "Undo" : <span>Delete</span>}
        </button>
      </td>
    </tr>
  )
}
