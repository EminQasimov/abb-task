import React, { useEffect, useState } from 'react'

import { confirmDialog } from 'primereact/confirmdialog'
import useFetch from 'hooks/use-fetch'

import { StringSchema } from 'yup'
import { noop } from 'types'

export type HookProps = {
  initialValue: string
  field: string
  id: string
  loadTable: noop
  schema?: StringSchema
}

export default function useCellState(props: HookProps) {
  const { initialValue, id, field, schema, loadTable } = props

  const [value, setValue] = useState(() => initialValue ?? '')
  const [errors, setErrors] = useState([])

  const isValueNotChanged = value === initialValue

  const { refetch: saveValue } = useFetch({
    url: `/api/employees/${id}`,
    fetchOptions: {
      method: 'PATCH',
      body: JSON.stringify({
        [field]: value,
      }),
    },
    onSuccess: () => {
      loadTable()
    },
  })

  const handleSubmit = (closeCallback: noop) => {
    if (isValueNotChanged) {
      closeCallback()
      return
    }

    schema
      ?.validate(value)
      .then(() => {
        saveValue(closeCallback)
      })
      .catch((err: any) => {
        setErrors(err.errors)
      })
  }

  const handleCancel = (closeCallback: noop) => {
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
      header: 'Confirmation',
      icon: 'pi pi-info-circle',
      position: 'top',
      rejectLabel: 'No, cancel changes',
      acceptLabel: 'Yes, save my changes',
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

  return {
    value,
    setValue,
    handleCancel,
    handleSubmit,
    saveValue,
    errors,
  }
}
