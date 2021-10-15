import React, { ReactChild } from "react"
import styles from "./table.module.scss"

type TableProps = {
  children: ReactChild
}

export const Table = ({ children }: TableProps) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.idColumnTh}>ID</th>
          <th>Name</th>
          <th>Surname</th>
          <th>Date of birth</th>
          <th>Position</th>
          <th>Phone number</th>
          <th className={styles.lastColumnTh}></th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  )
}
