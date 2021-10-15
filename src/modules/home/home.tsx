import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"

import Header from "./header/header"
import { Table, Row, TableSkeletonLoader } from "./table"
import Footer from "./footer/footer"

import useFetch from "hooks/use-fetch"
import { changeUrlParamsSilently, removeEmptyValues } from "utils"

import { Employee } from "types/employee"
import { PaginatorPageState } from "primereact/paginator"

export type PageProps = {
  employees: Employee[]
  totalEmployeesCount: number
}

export type HomeState = {
  queryEnabled: boolean
  currentPage: number
  search: string
  filter: string
}

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

  if (error && !isLoading) {
    tableContent = (
      <tr>
        <td colSpan={7}>
          <div>Failed to load employees</div>
        </td>
      </tr>
    )
  } else if (isLoading) {
    tableContent = <TableSkeletonLoader rowCount={10} cellCount={7} />
  } else if (data?.employees) {
    tableContent = data.employees.map((employee: Employee) => (
      <Row
        key={employee.id}
        employee={employee}
        search={search as string}
        loadTable={refetch}
        deleted={filter === "deleted"}
      />
    ))
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
          deletedEmployeesCount: data.deletedEmployeesCount,
          updatedEmployeesCount: data.updatedEmployeesCount,
        }}
      />
      <Table>{tableContent}</Table>
      <Footer
        {...{
          totalEmployeesCount: data.totalEmployeesCount,
          currentPage,
          onPageChange,
          refetch,
        }}
      />
    </div>
  )
}

export default Home
