import { NextApiRequest, NextApiResponse } from "next"
import db from "utils/db"

export default function employeeController(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, method } = req

  const { page, limit, search, id } = query

  console.log(query)

  //

  switch (method) {
    case "DELETE":
      const deleted = db.deleteEmployee(id as string)
      res.status(200).json(deleted)
      break
    // case 'PUT':
    //   // Update or create data in your database
    //   res.status(200).json({ id, name: name || `User ${id}` })
    //   break
    default:
      res.setHeader("Allow", ["GET", "PUT"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
