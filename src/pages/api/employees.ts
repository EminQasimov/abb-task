import faker from 'faker'
import { nanoid } from 'nanoid'
import { NextApiRequest, NextApiResponse } from 'next'

import { Employee } from 'types/employee'

faker.locale = 'az'

function generateFakeData(count = 10): Employee[] {
  return [...Array(count)].map(() => {
    const [name, surname] = faker.name.findName().split(' ')
    return {
      id: nanoid(10),
      name,
      surname,
      birthDate: faker.date.past(),
      position: faker.name.jobType(),
      phone: faker.phone.phoneNumber(),
    }
  })
}

const employees = generateFakeData()

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  setTimeout(() => {
    res.status(200).json(employees)
  }, 1000)
}
