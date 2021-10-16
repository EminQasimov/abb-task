import { useState, useRef, ReactChild } from "react"
import useOnClickOutside from "hooks/use-outside-click"
import { CancelIcon, CheckIcon, EditIcon } from "assets/icons"

import styles from "./inline-form.module.scss"

type InlineFormProps = {
  viewMode: ReactChild
  renderEditMode: (close: () => void) => ReactChild
  onSubmit: (close: () => void) => void
  onCancel: (close: () => void) => void
  disabled?: boolean
}

export const InlineForm = (props: InlineFormProps) => {
  const {
    renderEditMode,
    viewMode,
    onSubmit,
    onCancel,
    disabled = false,
  } = props
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
      <div className={styles.editWrap}>{renderEditMode(closeCallback)}</div>
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
    <div className={styles.content}>
      {isEdit && !disabled ? (
        form
      ) : (
        <button
          role="button"
          className={styles.viewModeWrap}
          onClick={() => setEdit(true)}
        >
          {viewMode}
          <EditIcon fontSize={20} className={styles.editIcon} />
        </button>
      )}
    </div>
  )
}
