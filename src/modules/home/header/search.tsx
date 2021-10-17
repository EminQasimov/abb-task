import { CancelIcon, SearchIcon } from 'assets/icons'
import { Input } from 'components'
import { useEffect, useState } from 'react'

import styles from './header.module.scss'

interface SearchProps {
  onSearch: (search: string) => void
  initialValue: string
}

export default function Search(props: SearchProps) {
  const { onSearch, initialValue } = props
  const [value, setValue] = useState(() => initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return (
    <form
      className={styles.searchContainer}
      onSubmit={(e) => {
        e.preventDefault()
        onSearch(value)
      }}
    >
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search"
        className={styles.searchInput}
      />
      <button
        type="button"
        onClick={() => {
          if (value) {
            setValue('')
            onSearch('')
          }
        }}
      >
        {value ? <CancelIcon /> : <SearchIcon fontSize={16} />}
      </button>
    </form>
  )
}
