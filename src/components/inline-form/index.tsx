import { useState, useRef, ReactChild } from "react"
import useOnClickOutside from "hooks/use-outside-click"
import { CancelIcon, CheckIcon } from "assets/icons"

import styles from "./inline-form.module.scss"

type InlineFormProps = {
  viewMode: ReactChild
  editMode: ReactChild
  onSubmit: (close: () => void) => void
  onCancel: (close: () => void) => void
  disabled?: boolean
}

export const InlineForm = (props: InlineFormProps) => {
  const { editMode, viewMode, onSubmit, onCancel, disabled = false } = props
  const [isEdit, setEdit] = useState(false)
  const ref = useRef<HTMLFormElement>(null)

  function closeCallback() {
    setEdit(false)
  }

  function cancelEditing() {
    onCancel(closeCallback)
  }

  const form = (
    <form
      ref={ref}
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(closeCallback)
      }}
      className={styles.form}
    >
      <div className={styles.editWrap}>{editMode}</div>
      <div className={styles.formButtons}>
        <button
          aria-label="save editing"
          className={styles.saveButton}
          type="submit"
        >
          <CheckIcon />
        </button>
        <button
          aria-label="cancel editing"
          className={styles.cancelButton}
          onClick={cancelEditing}
          type="button"
        >
          <CancelIcon />
        </button>
      </div>
    </form>
  )

  useOnClickOutside(ref, cancelEditing)

  return (
    <div>
      {isEdit && !disabled ? (
        form
      ) : (
        <div onClick={() => setEdit(true)}>{viewMode}</div>
      )}
    </div>
  )
}
