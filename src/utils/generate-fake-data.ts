import faker from "faker"
import { nanoid } from "nanoid"

import { Employee } from "types"

faker.locale = "az"

export function generateFakeData(count = 50) {
  const employees: { [k: string]: Employee } = {}

  ;[...Array(count)].forEach(() => {
    const [name, surname] = faker.name.findName().split(" ")
    const id = nanoid(10)

    employees[id] = {
      id,
      name,
      surname,
      birthDate: String(faker.date.past()),
      position: faker.name.jobType(),
      phone: faker.phone.phoneNumber(),
    }
  })

  return employees
}
