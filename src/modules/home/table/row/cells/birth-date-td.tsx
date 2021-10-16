import React, { useEffect, useState } from "react"
import { InlineForm, DatePicker } from "components"

import { confirmDialog } from "primereact/confirmdialog"
import useFetch from "hooks/use-fetch"

import { StringSchema } from "yup"
import { readableDateFormat } from "utils"
import { Moment } from "moment"
import { DateIcon } from "assets/icons"

import styles from "../../table.module.scss"

export type SharedProps = {
  initialValue: Moment
  field: string
  id: string
  loadTable: () => void
  schema: StringSchema
}

export const BirthDateTd = (props: SharedProps) => {
  const { initialValue, id, field, schema } = props
  const [value, setValue] = useState(() => initialValue)
  const [errors, setErrors] = useState([])
  const isValueNotChanged = value?.isSame(initialValue) ?? true
  const formatedValue = initialValue.format(readableDateFormat)

  const { refetch: saveValue } = useFetch({
    url: `/api/employees/${id}`,
    fetchOptions: {
      method: "PATCH",
      body: JSON.stringify({
        [field]: value?.format(),
      }),
    },
    queryEnabled: false,
    onSuccess: () => {
      props.loadTable()
    },
  })

  function handleSubmit(closeCallback: () => void) {
    if (isValueNotChanged) {
      closeCallback()
      return
    }

    saveValue(closeCallback)
  }

  function handleCancel(closeCallback: () => void) {
    if (isValueNotChanged) {
      closeCallback()
      return
    }

    confirmDialog({
      message: (
        <div>
          Are you sure you want to proceed without <br />
          saving <strong>{formatedValue}</strong> ?
        </div>
      ),
      header: "Confirmation",
      icon: "pi pi-info-circle",
      position: "top",
      rejectLabel: "No, cancel changes",
      acceptLabel: "Yes, save my changes",
      reject: () => {
        closeCallback()
        setValue(initialValue)
      },
      accept: () => {
        handleSubmit(closeCallback)
      },
    })
  }

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

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
            value={value}
            onChange={(value) => setValue(value)}
            errors={errors}
          />
        )}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </td>
  )
}
