export * from "./handlers"
import fs from "fs"
import path from "path"
import data from "./data/data.json"

import { Employee } from "types"

console.log("Local DB loaded")

export let employees: Employee[] = data.employees
export let initialEmployees: { [key: string]: Employee } = data.initialEmployees
export let deletedEmployees: Employee[] = data.deletedEmployees

/**
 * @description save memory state into local file system as json.
 * it will not work in serverless deployments - Vercel, Netlify etc.
 * it helps not to loose state by nextjs dev mode hot reloads.
 */
export function saveDb() {
  const storedData = {
    initialEmployees,
    deletedEmployees,
    employees,
  }
  const url = path.resolve(process.cwd(), "./src/db/data/data.json")

  fs.writeFileSync(url, JSON.stringify(storedData, null, 2))
  console.log("DB saved into " + url)
}
