import React from "react"
import { HomeState } from "../home"
import Search from "./search"

import styles from "./header.module.scss"

type HeaderProps = {
  handleSearch: (search: string) => void
  setState: (props: any) => void
  filter: string
  search: string
  deletedEmployeesCount: number
  updatedEmployeesCount: number
}

export default function Header(props: HeaderProps) {
  const {
    handleSearch,
    setState,
    filter,
    search,
    deletedEmployeesCount,
    updatedEmployeesCount,
  } = props

  function update(options: Partial<HomeState>) {
    setState((prev: HomeState) => ({
      ...prev,
      queryEnabled: true,
      page: 1,
      ...options,
    }))
  }

  function handleAllFilter() {
    update({
      filter: "all",
    })
  }

  function handleUpdatedFilter() {
    update({
      filter: "updated",
    })
  }

  function handleDeletedFilter() {
    update({
      filter: "deleted",
    })
  }

  return (
    <div className={styles.homeHeader}>
      <div className={styles.buttons}>
        <span>Filters: </span>
        <button
          onClick={handleAllFilter}
          className={filter === "all" ? styles.active : ""}
        >
          All employees
        </button>

        <button
          onClick={handleUpdatedFilter}
          className={filter === "updated" ? styles.active : ""}
        >
          <strong className={styles.countBadge}>{updatedEmployeesCount}</strong>
          Updated employees
        </button>

        <button
          onClick={handleDeletedFilter}
          className={filter === "deleted" ? styles.active : ""}
        >
          <strong className={styles.countBadge}>{deletedEmployeesCount}</strong>
          Deleted employees
        </button>
      </div>

      <Search onSearch={handleSearch} initialValue={search} />
    </div>
  )
}
