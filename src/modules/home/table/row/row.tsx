import moment from "moment"

import { BirthDateTd, PhoneTd, SharedTd, DeleteTd } from "./cells"
import { Employee } from "types/employee"
import { textSchema, phoneSchema } from "./validations"

import styles from "../table.module.scss"
import { noop } from "types"

type RowProps = {
  employee: Employee
  search?: string | undefined
  loadTable: noop
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
    schema: textSchema,
  }

  return (
    <tr className={deleted ? styles.deleted : ""}>
      <td>
        <span className={styles.idColCell}>{id}</span>
      </td>

      <SharedTd field="name" initialValue={name} {...sharedProps} />
      <SharedTd field="surname" initialValue={surname} {...sharedProps} />
      <BirthDateTd
        field="birthDate"
        initialValue={moment(birthDate)}
        {...sharedProps}
      />
      <SharedTd field="position" initialValue={position} {...sharedProps} />
      <PhoneTd
        field="phone"
        initialValue={phone}
        {...sharedProps}
        schema={phoneSchema}
      />
      <DeleteTd {...{ loadTable, deleted, id }} />
    </tr>
  )
}
