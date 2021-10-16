import { employees, initialEmployees, saveDb } from "db"
import { Employee } from "types"
import { shallowEqual } from "utils"

export function updateEmployee(employeeId: string, body: Partial<Employee>) {
  const foundIndex = employees.findIndex((item) => item.id === employeeId)
  if (foundIndex === -1) return null

  const foundEmployee = employees[foundIndex]
  const updatedEmployee = { ...foundEmployee, ...body }

  const oldEmployee = initialEmployees[employeeId] ?? foundEmployee
  const isEqual = shallowEqual(updatedEmployee, oldEmployee)

  // update values in employees
  employees.splice(foundIndex, 1, updatedEmployee)

  if (isEqual) {
    // if it is same value not add it to changedEmpoyees list
    delete initialEmployees[employeeId]
  } else {
    // save old values for then can be reset to inital values
    initialEmployees[employeeId] = foundEmployee
  }

  console.log(
    `/api/employee/:id  - PATCH - ${foundEmployee.name}(${employeeId}) - updated \n`
  )
  saveDb()

  return updatedEmployee
}
