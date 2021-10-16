import React, { useEffect, useState } from "react"
import { InlineForm, Input, MaskedInput } from "components"
import { confirmDialog } from "primereact/confirmdialog"
import useFetch from "hooks/use-fetch"
import { StringSchema } from "yup"
import { noop } from "types"

export type SharedProps = {
  initialValue: string
  field: string
  search: string | undefined
  id: string
  loadTable: () => void
  deleted: boolean
  schema: StringSchema
}

export const PhoneTd = (props: SharedProps) => {
  const { initialValue, id, field, search = "", deleted, schema } = props
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
    queryEnabled: false,
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
      .catch(function (err) {
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
        disabled={deleted}
        viewMode={value}
        renderEditMode={() => (
          <MaskedInput
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
