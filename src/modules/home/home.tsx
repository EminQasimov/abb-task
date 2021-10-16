import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"

import Header from "./header/header"
import { Table, Row, TableSkeletonLoader } from "./table"
import Footer from "./footer/footer"

import useFetch from "hooks/use-fetch"
import { changeUrlParamsSilently, removeEmptyValues } from "utils"

import { Employee } from "types/employee"
import { PaginatorPageState } from "primereact/paginator"
import { LIMIT } from "configs"

export type PageProps = {
  employees: Employee[]
  totalEmployeesCount: number
  deletedEmployeesCount: number
  updatedEmployeesCount: number
}

export type HomeState = {
  queryEnabled: boolean
  currentPage: number
  search: string
  filter: string
}

const COL_COUNT = 7

const Home = (props: PageProps) => {
  const router = useRouter()

  const [state, setState] = useState<HomeState>(() => {
    const currentPage = Number(router.query.page) || 1

    return {
      queryEnabled: false,
      currentPage,
      search: router.query.search ? String(router.query.search) : "",
      filter: router.query.filter ? String(router.query.filter) : "all",
    }
  })

  const { queryEnabled, currentPage, search, filter } = state

  let params = removeEmptyValues({
    page: currentPage,
    search,
    filter,
  })
  let searchParams = new URLSearchParams(params)

  const { data, isLoading, error, refetch } = useFetch({
    url: `/api/employees?${searchParams}`,
    initialData: {
      ...props,
    },
    queryEnabled,
  })

  let tableContent = null
  const {
    employees,
    deletedEmployeesCount,
    updatedEmployeesCount,
    totalEmployeesCount,
  } = data || {}

  if (error && !isLoading) {
    tableContent = (
      <tr>
        <td colSpan={COL_COUNT}>
          <div>Failed to load employees</div>
        </td>
      </tr>
    )
  } else if (isLoading) {
    tableContent = (
      <TableSkeletonLoader rowCount={LIMIT} cellCount={COL_COUNT} />
    )
  } else if (employees && employees.length > 0) {
    tableContent = employees.map((employee: Employee) => (
      <Row
        key={employee.id}
        employee={employee}
        search={search}
        loadTable={refetch}
        deleted={filter === "deleted"}
      />
    ))
  } else {
    tableContent = (
      <tr>
        <td colSpan={COL_COUNT}>
          <div className="empty-state">
            <img src="/empty.png" alt="" width="180px" />
            <h1>Nothing here to see! </h1>
          </div>
        </td>
      </tr>
    )
  }

  function handleSearch(search: string) {
    changeUrlParamsSilently("search", search)

    setState((prev) => ({
      ...prev,
      currentPage: 1,
      search,
      queryEnabled: true,
    }))
  }

  function onPageChange(e: PaginatorPageState) {
    const nextPage = e.page + 1

    setState((prev) => ({
      ...prev,
      queryEnabled: true,
      currentPage: nextPage,
    }))
  }

  useEffect(() => {
    changeUrlParamsSilently("page", String(currentPage))
    changeUrlParamsSilently("filter", filter as string)
  }, [currentPage, filter])

  return (
    <div>
      <Header
        {...{
          handleSearch,
          setState,
          filter,
          search,
          deletedEmployeesCount,
          updatedEmployeesCount,
        }}
      />
      <Table>{tableContent}</Table>
      <Footer
        {...{
          totalEmployeesCount,
          currentPage,
          onPageChange,
          refetch,
        }}
      />
    </div>
  )
}

export default Home
