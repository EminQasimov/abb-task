import React, { useEffect, useState } from "react"
import { Employee } from "types/employee"
import tableLoader from "./table-loader"

import { Paginator } from "primereact/paginator"
import { changeUrlParamsSilently } from "utils/change-url-params-silently"
import Search from "./search"
import { useRouter } from "next/router"
import useFetch from "hooks/useFetch"

import { Row } from "./row"

const Home = ({ employees, totalEmployeesCount }: any) => {
  const router = useRouter()

  const [state, setState] = useState(() => {
    const currentPage: number = Number(router.query.page) || 1

    return {
      queryEnabled: false,
      currentPage,
      search: router.query.search ?? "",
    }
  })

  const { queryEnabled, currentPage, search } = state

  const { data, isLoading, error, refetch } = useFetch({
    url: `/api/employees?page=${currentPage}${search && "&search=" + search}`,
    initialData: {
      employees,
      totalEmployeesCount,
    },
    queryEnabled,
  })

  function handleSearch(search: string) {
    changeUrlParamsSilently("search", search)

    setState((prev) => ({
      ...prev,
      currentPage: 1,
      search,
      queryEnabled: true,
    }))
  }

  useEffect(() => {
    changeUrlParamsSilently("page", String(currentPage))
  }, [currentPage])

  return (
    <div>
      <Search onSearch={handleSearch} initialValue={search as string} />

      <table className="employees-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Date of birth</th>
            <th>Position</th>
            <th>Phone number</th>
            <th className="last-column"> </th>
          </tr>
        </thead>
        <tbody>
          {isLoading && tableLoader}

          {error && (
            <tr>
              <td colSpan={7}>
                <div>Failed to load employees</div>
              </td>
            </tr>
          )}

          {!isLoading &&
            !error &&
            data?.employees.map((employee: Employee) => (
              <Row
                key={employee.id}
                employee={employee}
                search={search as string}
                state={state}
                loadData={refetch}
              />
            ))}
        </tbody>
      </table>

      <div>
        <div>{data.totalEmployeesCount} results found</div>
        <div>
          <Paginator
            first={(currentPage - 1) * 10} // Zero-relative number of the first row to be displayed.
            rows={10} // Data count to display per page.
            totalRecords={data.totalEmployeesCount}
            onPageChange={(e) => {
              const nextPage = e.page + 1

              setState((prev) => ({
                ...prev,
                queryEnabled: true,
                currentPage: nextPage,
              }))
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Home
