import React, { useEffect, useState } from "react"
import { InlineForm, Input } from "components"

import Highlighter from "react-highlight-words"
import { confirmDialog } from "primereact/confirmdialog"
import useFetch from "hooks/use-fetch"

import { StringSchema } from "yup"
import { noop } from "types"

export type SharedProps = {
  initialValue: string
  field: string
  search: string | undefined
  id: string
  loadTable: noop
  schema: StringSchema
}

export const SharedTd = (props: SharedProps) => {
  const { initialValue, id, field, search = "", schema } = props
  const [value, setValue] = useState(() => initialValue ?? "")
  const [errors, setErrors] = useState([])
  const isValueNotChanged = value === initialValue

  const { refetch: saveValue } = useFetch({
    url: `/api/employees/${id}`,
    fetchOptions: {
      method: "PATCH",
      body: JSON.stringify({
        [field]: value,
      }),
    },
    onSuccess: () => {
      props.loadTable()
    },
  })

  function handleSubmit(closeCallback: noop) {
    if (isValueNotChanged) {
      closeCallback()
      return
    }

    schema
      .validate(value)
      .then(() => {
        saveValue(closeCallback)
      })
      .catch((err) => {
        setErrors(err.errors)
      })
  }

  function handleCancel(closeCallback: noop) {
    if (isValueNotChanged) {
      closeCallback()
      return
    }

    confirmDialog({
      message: (
        <div>
          Are you sure you want to proceed without <br />
          saving <strong>{value}</strong> ?
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
          <Highlighter
            searchWords={search.split("")}
            textToHighlight={value}
            autoEscape
          />
        }
        renderEditMode={() => (
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
            errors={errors}
          />
        )}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </td>
  )
}
