import { NextApiRequest, NextApiResponse } from "next"
import sleep from "utils/sleep"
import db from "utils/db"

export default async function getAllEmployees(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { page, limit, search } = req.query

  const data = db.getEmployees(page, limit, search)

  await sleep(300)

  res.status(200).json(data)
}
