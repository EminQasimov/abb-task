import { NextApiRequest, NextApiResponse } from 'next'
import { sleep } from 'utils'
import * as db from 'db'

// api/employees
export default async function getAllEmployees(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { page, limit, search, filter } = req.query
  await sleep(600)

  switch (req.method) {
    case 'GET': {
      const data = db.getEmployees({ page, limit, search, filter })
      res.status(200).json(data)
      break
    }
    case 'POST': {
      db.resetEmployees()
      res.status(200).json({})
      break
    }
    default: {
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  }
}
