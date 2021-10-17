import { InlineForm, Input } from 'components'
import Highlighter from 'react-highlight-words'
import useCellState from './use-cell-state'

import { StringSchema } from 'yup'
import { noop } from 'types'

export type SharedProps = {
  initialValue: string
  field: string
  search: string | undefined
  id: string
  loadTable: noop
  schema: StringSchema
}

export const SharedTd = (props: SharedProps) => {
  const { search = '' } = props

  const { value, setValue, handleSubmit, handleCancel, errors } =
    useCellState(props)

  return (
    <td>
      <InlineForm
        viewMode={
          <Highlighter
            searchWords={search.split('')}
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
