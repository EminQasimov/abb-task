import React, { useEffect, useState } from "react"
import { InputText } from "primereact/inputtext"
import { InlineForm } from "components/inline-form"
import Highlighter from "react-highlight-words"
import { confirmDialog } from "primereact/confirmdialog"
import useFetch from "hooks/use-fetch"

type SharedProps = {
  initialValue: string
  field: string
  search: string
  id: string
  reload: () => void
  deleted: boolean
}

export const SharedTd = (props: SharedProps) => {
  const { initialValue, id, field, deleted } = props
  const [value, setValue] = useState(() => initialValue ?? "")

  const { refetch } = useFetch({
    url: `/api/employees/${id}`,
    fetchOptions: {
      method: "PATCH",
      body: JSON.stringify({
        [field]: value,
      }),
    },
    queryEnabled: false,
    onSuccess: () => {
      props.reload()
    },
  })

  function handleSubmit(closeCallback: () => void) {
    if (value.trim() === initialValue.trim()) {
      closeCallback()
      return
    }
    refetch(closeCallback)
  }

  function handleCancel(closeCallback: () => void) {
    if (value.trim() === initialValue.trim()) {
      closeCallback()
      return
    }

    confirmDialog({
      message: (
        <div>
          Are you sure you want to proceed without saving <br />
          <strong>{value}</strong> ?
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
        refetch(closeCallback)
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
        viewMode={
          <Highlighter
            searchWords={props.search.split("")}
            textToHighlight={value}
            autoEscape
          />
        }
        editMode={
          <InputText
            value={value}
            autoFocus
            onChange={(e) => setValue(e.target.value)}
          />
        }
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </td>
  )
}
