import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Header from './header/header'
import { Table, Row, TableSkeletonLoader, EmptyLayout } from './table'
import Footer from './footer/footer'

import useFetch from 'hooks/use-fetch'
import { changeUrlParamsSilently, removeEmptyValues } from 'utils'

import { Employee } from 'types'
import { PaginatorPageState } from 'primereact/paginator'
import { LIMIT } from 'configs'

export type PageProps = {
  employees: Employee[]
  totalEmployeesCount: number
  deletedEmployeesCount: number
  updatedEmployeesCount: number
}

export type HomeState = {
  queryEnabled: boolean
  page: number
  search: string
  filter: string
}

const COL_COUNT = 7 // table columns count

const Home = (props: PageProps) => {
  const router = useRouter()

  const [state, setState] = useState<HomeState>(() => {
    const page = Number(router.query.page) || 1

    return {
      queryEnabled: false,
      page,
      search: router.query.search ? String(router.query.search) : '',
      filter: router.query.filter ? String(router.query.filter) : 'all',
    }
  })

  const { queryEnabled, page, search, filter } = state

  // don't show empty values in url bar
  const params = removeEmptyValues({
    page,
    search,
    filter,
  })
  const searchParams = new URLSearchParams(params)

  const { data, isLoading, error, refetch } = useFetch({
    url: `/api/employees?${searchParams}`,
    initialData: props,
    queryEnabled,
  })
  const {
    employees,
    deletedEmployeesCount,
    updatedEmployeesCount,
    totalEmployeesCount,
  } = data || {}

  let tableContent = null

  if (error && !isLoading) {
    tableContent = (
      <EmptyLayout colSpan={COL_COUNT}>
        <div>Failed to load employees</div>
      </EmptyLayout>
    )
  } else if (isLoading) {
    tableContent = (
      <TableSkeletonLoader rowCount={LIMIT} cellCount={COL_COUNT} />
    )
  } else if (employees?.length > 0) {
    tableContent = employees.map((employee: Employee) => (
      <Row
        key={employee.id}
        employee={employee}
        search={search}
        loadTable={refetch}
        deleted={filter === 'deleted'}
      />
    ))
  } else {
    tableContent = (
      <EmptyLayout colSpan={COL_COUNT}>
        <h1>Nothing here to see! </h1>
        <div>or Check, search filter is not applied</div>
      </EmptyLayout>
    )
  }

  function handleSearch(search: string) {
    changeUrlParamsSilently('search', search)

    setState((prev) => ({
      ...prev,
      page: 1,
      search,
      queryEnabled: true,
    }))
  }

  function onPageChange(e: PaginatorPageState) {
    const nextPage = e.page + 1

    setState((prev) => ({
      ...prev,
      queryEnabled: true,
      page: nextPage,
    }))
  }

  useEffect(() => {
    changeUrlParamsSilently('page', String(page))
    changeUrlParamsSilently('filter', filter as string)
  }, [page, filter])

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
          page,
          onPageChange,
          refetch,
        }}
      />
    </div>
  )
}

export default Home
