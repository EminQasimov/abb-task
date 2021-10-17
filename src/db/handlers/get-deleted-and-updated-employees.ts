import { deletedEmployees, employees, initialEmployees } from 'db'
import { Employee } from 'types'

export function getUpdatedEmployees() {
  const updated = Object.keys(initialEmployees).reduce((acc, nextKey) => {
    const found = employees.find((item) => item.id === nextKey)

    if (found) {
      acc.push(found)
    }

    return acc
  }, [] as Employee[])

  return updated
}

export function getDeletedAndUpdatedEmployees() {
  return {
    updated: getUpdatedEmployees(),
    deleted: deletedEmployees,
  }
}
