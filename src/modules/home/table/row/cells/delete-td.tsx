import React from "react"
import styles from "../../table.module.scss"
import useFetch from "hooks/use-fetch"

type DeleteTdProps = {
  deleted: boolean
  id: string
  loadTable: () => void
}

export const DeleteTd = (props: DeleteTdProps) => {
  const { deleted, loadTable, id } = props

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

  return (
    <td className={styles.lastCell}>
      <button
        className={`${styles.button} ${
          deleted ? styles.undoButton : styles.deleteButton
        }`}
        onClick={() => {
          deleted ? undoEmployee() : removeEmployee()
        }}
      >
        {deleted ? "Undo" : <span>Delete</span>}
      </button>
    </td>
  )
}
