import { InputText } from "primereact/inputtext"
import { useState } from "react"

interface SearchProps {
  onSearch: (search: string) => void
  initialValue: string
}

export default function Search({ onSearch, initialValue }: SearchProps) {
  const [value, setValue] = useState(() => initialValue)

  return (
    <form
      className="search-container"
      onSubmit={function handleSubmit(e) {
        e.preventDefault()
        onSearch(value)
      }}
    >
      <span className="p-input-icon-right">
        <InputText
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search"
        />
        {value ? (
          <i
            className="pi pi-times"
            onClick={() => {
              setValue("")
              onSearch("")
            }}
          />
        ) : (
          <i className="pi pi-search" />
        )}
      </span>
    </form>
  )
}
