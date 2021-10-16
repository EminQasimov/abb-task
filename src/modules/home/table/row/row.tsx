import { BirthDateTd, PhoneTd, SharedTd, DeleteTd } from "./cells"
import { textSchema, phoneSchema, dateSchema } from "./validations"

import styles from "../table.module.scss"

import { Employee, noop } from "types"

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
        initialValue={birthDate}
        {...sharedProps}
        schema={dateSchema}
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
