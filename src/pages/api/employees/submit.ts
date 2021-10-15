import { NextApiRequest, NextApiResponse } from "next"
import * as db from "db"
import { sleep } from "utils"

// api/employees/submit
export default async function getDeleteAndUpdatedEmployees(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await sleep(600)

  switch (req.method) {
    case "GET":
      const data = db.getDeletedAndUpdatedEmployees()
      res.status(200).json(data)
      break
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
