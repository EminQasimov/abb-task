import { NextApiRequest, NextApiResponse } from 'next'
import * as db from 'db'

// /api.employees/undo/:id
export default function employeeHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, method } = req
  const { id } = query

  switch (method) {
    case 'POST': {
      const data = db.undoEmployee(id as string)
      res.status(200).json(data)
      break
    }
    default: {
      res.status(405).end(`Method ${method} Not Allowed`)
    }
  }
}
