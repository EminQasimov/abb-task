import { useState, ReactChild } from "react"
import { CancelIcon, CheckIcon, EditIcon } from "assets/icons"

import styles from "./inline-form.module.scss"
import useClickOutside from "hooks/use-click-outside"
import { noop } from "types"

type InlineFormProps = {
  viewMode: ReactChild
  renderEditMode: (isEdit: boolean) => ReactChild
  onSubmit: (close: noop) => void
  onCancel: (close: noop) => void
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

  function closeCallback() {
    setEdit(false)
  }

  function cancelEditing() {
    onCancel(closeCallback)
  }

  const ref = useClickOutside(cancelEditing)

  const form = (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(closeCallback)
      }}
      className={styles.form}
    >
      <div className={styles.editWrap}>{renderEditMode(isEdit)}</div>
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

  return (
    <div className={styles.content} ref={ref}>
      {isEdit && !disabled ? (
        form
      ) : (
        <button
          role="button"
          className={styles.viewModeWrap}
          onClick={() => setEdit(true)}
          title="Double click to edit"
        >
          {viewMode}
          <EditIcon fontSize={20} className={styles.editIcon} />
        </button>
      )}
    </div>
  )
}
