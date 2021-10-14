import { deletedEmployees, employees } from "./employees"
import { matchSorter } from "match-sorter"

//  page numbers start with 1
function paginate(array: any[], limit: number, page: number) {
  return array.slice((page - 1) * limit, page * limit)
}

const db = {
  getEmployees(page?: any, limit?: any, search?: any) {
    let currentPage = Number(page) || 1
    let limitCount = Number(limit) || 10
    let filteredEmployees = [...employees]

    if (search) {
      filteredEmployees = matchSorter(filteredEmployees, search, {
        keys: ["name", "surname"],
      })
    }

    return {
      employees: paginate(filteredEmployees, limitCount, currentPage),
      totalEmployeesCount: search ? filteredEmployees.length : employees.length,
    }
  },

  deleteEmployee(employeeId: string) {
    const foundIndex = employees.findIndex((item) => item.id === employeeId)
    if (foundIndex === -1) return null

    const foundEmployee = employees[foundIndex]
    deletedEmployees.push(foundEmployee)
    employees.splice(foundIndex, 1)

    return foundEmployee
  },

  getDeletedEmployees(page?: any, limit?: any, search?: any) {
    let currentPage = Number(page) || 1
    let limitCount = Number(limit) || 10
    let filteredEmployees = [...deletedEmployees]

    if (search) {
      filteredEmployees = matchSorter(filteredEmployees, search, {
        keys: ["name", "surname"],
      })
    }

    return {
      employees: paginate(filteredEmployees, limitCount, currentPage),
      totalEmployeesCount: search
        ? filteredEmployees.length
        : deletedEmployees.length,
    }
  },
}

export default db
