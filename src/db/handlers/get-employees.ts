import { LIMIT } from 'configs'
import { deletedEmployees, employees, getUpdatedEmployees } from 'db'
import { matchSorter } from 'match-sorter'
import { Employee } from 'types'

// page numbers start with 1
function paginate(array: Employee[], limit: number, page: number) {
  return array.slice((page - 1) * limit, page * limit)
}

type QueryParams = {
  page?: any
  limit?: any
  search?: any
  filter?: string | string[]
}

export function getEmployees(params: QueryParams) {
  const { page, limit, search, filter } = params

  const currentPage = Number(page) || 1
  const limitCount = Number(limit) || LIMIT
  let totalEmployeesCount = 0

  let filteredEmployees: Employee[] = []

  if (filter === 'deleted') {
    filteredEmployees = [...deletedEmployees]
  } else if (filter === 'updated') {
    filteredEmployees = getUpdatedEmployees()
  } else {
    filteredEmployees = [...employees]
  }

  if (search) {
    filteredEmployees = matchSorter(filteredEmployees, search, {
      keys: ['name', 'surname', 'position'],
    })
  }

  totalEmployeesCount = filteredEmployees.length

  const response = {
    employees: paginate(filteredEmployees, limitCount, currentPage),
    totalEmployeesCount,
    deletedEmployeesCount: deletedEmployees.length,
    updatedEmployeesCount: getUpdatedEmployees().length,
  }

  console.log(`/api/employees  - GET - ${totalEmployeesCount}  - get all \n`)

  return response
}
