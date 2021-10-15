import { deletedEmployees, employees, saveDb } from "db"

export function undoEmployee(employeeId: string) {
  const foundIndex = deletedEmployees.findIndex(
    (item) => item.id === employeeId
  )
  if (foundIndex === -1) return null

  const foundEmployee = deletedEmployees[foundIndex]
  employees.unshift(foundEmployee)

  deletedEmployees.splice(foundIndex, 1)

  console.log(
    `/api/employee/undo/:id  - POST - ${foundEmployee.name}(${employeeId}) - recovered \n`
  )

  saveDb()

  return foundEmployee
}
