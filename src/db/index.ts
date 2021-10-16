export * from "./handlers"
import fs from "fs"
import path from "path"
import data from "./data/data.json"

import { Employee } from "types/employee"

console.log("Local DB loaded")

export let employees: Employee[] = data.employees
export let initialEmployees: { [key: string]: Employee } = data.initialEmployees
export let deletedEmployees: Employee[] = data.deletedEmployees

export function saveDb() {
  const storedData = {
    employees,
    initialEmployees,
    deletedEmployees,
  }
  const url = path.resolve(process.cwd(), "./src/db/data/data.json")

  fs.writeFileSync(url, JSON.stringify(storedData, null, 2))
  console.log("DB saved into " + url)
}
