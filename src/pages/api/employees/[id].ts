import { NextApiRequest, NextApiResponse } from "next"
import * as db from "db"

// /api.employees/:id
export default function employeeHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, method, body } = req
  const { id } = query

  switch (method) {
    case "DELETE":
      const deleted = db.deleteEmployee(id as string)
      res.status(200).json(deleted)
      break
    case "PATCH":
      const updated = db.updateEmployee(id as string, JSON.parse(body))
      res.status(200).json(updated)
      break
    default:
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
