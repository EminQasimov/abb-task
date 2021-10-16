import { InlineForm, MaskedInput } from "components"
import { SharedProps } from "./shared-td"

import useCellState from "./use-cell-state"

export const PhoneTd = (props: SharedProps) => {
  const { value, setValue, handleSubmit, handleCancel, errors } =
    useCellState(props)

  return (
    <td>
      <InlineForm
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
