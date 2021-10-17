import { deletedEmployees, employees, saveDb } from 'db'

export function deleteEmployee(employeeId: string) {
  // check if employee exists
  const foundIndex = employees.findIndex((item) => item.id === employeeId)
  if (foundIndex === -1) return null

  const foundEmployee = employees[foundIndex]

  deletedEmployees.unshift(foundEmployee)
  employees.splice(foundIndex, 1)

  console.log(
    `/api/employee/:id  - DELETE - ${foundEmployee.name}(${employeeId}) - deleted \n`
  )

  saveDb()

  return foundEmployee
}
