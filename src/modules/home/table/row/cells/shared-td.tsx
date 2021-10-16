import React, { useEffect, useState } from "react"
import { InlineForm } from "components/inline-form/inline-form"
import { Input } from "components/input"

import Highlighter from "react-highlight-words"
import { confirmDialog } from "primereact/confirmdialog"
import useFetch from "hooks/use-fetch"

export type SharedProps = {
  initialValue: string
  field: string
  search: string | undefined
  id: string
  loadTable: () => void
  deleted: boolean
}

export const SharedTd = (props: SharedProps) => {
  const { initialValue, id, field, search = "", deleted } = props
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
      props.loadTable()
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
          />
        )}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </td>
  )
}
