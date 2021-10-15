import { employees, initialEmployees, saveDb } from "db"
import { Employee } from "types/employee"

export function updateEmployee(employeeId: string, body: Partial<Employee>) {
  const foundIndex = employees.findIndex((item) => item.id === employeeId)
  if (foundIndex === -1) return null

  const foundEmployee = employees[foundIndex]
  const updatedEmployee = { ...foundEmployee, ...body }

  employees.splice(foundIndex, 1, updatedEmployee)
  initialEmployees[employeeId] = foundEmployee

  // console.log({
  //   employeeId,
  //   body,
  //   foundEmployee,
  //   updatedEmployee,
  //   initialEmployees,
  //   bubu: employees.slice(0.5),
  // })
  console.log(
    `/api/employee/:id  - PATCH - ${foundEmployee.name}(${employeeId}) - updated \n`
  )
  saveDb()

  return updatedEmployee
}
