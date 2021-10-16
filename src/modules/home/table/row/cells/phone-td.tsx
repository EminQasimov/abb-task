import React from "react"
import { InputText } from "primereact/inputtext"
import { InlineForm } from "components/inline-form"
import { PhoneIcon } from "assets/icons"

import styles from "../../table.module.scss"

export const PhoneTd = (props: { phone: string }) => {
  const { phone } = props

  return (
    <td>
      <InlineForm
        viewMode={
          <div className={styles.cellViewMode}>
            <PhoneIcon fontSize={22} />
            {phone}
          </div>
        }
        renderEditMode={() => <InputText value={phone} autoFocus />}
        onSubmit={() => {}}
        onCancel={() => {}}
      />
    </td>
  )
}
