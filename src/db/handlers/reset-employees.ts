import { deletedEmployees, employees, initialEmployees, saveDb } from "db"

export function resetEmployees() {
  //  recover deleted employees
  const fullEmployees = employees.concat([...deletedEmployees])
  deletedEmployees.length = 0

  // undo changed employees state
  Object.keys(initialEmployees).forEach((id) => {
    const foundIndex = fullEmployees.findIndex((item) => item.id === id)
    const oldEmployee = initialEmployees[id]
    fullEmployees.splice(foundIndex, 1, oldEmployee)
    delete initialEmployees[id]
  })
  employees.length = 0
  employees.push(...fullEmployees)

  saveDb()
}
