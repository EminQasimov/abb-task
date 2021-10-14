/**
 * Assume that we have a list of employees with the following attributes:
    ID
    Name
    Surname
    Date of birth
    Position
    Phone number
 */

export interface Employee {
  id: string
  deleted: boolean
  name: string
  surname: string
  birthDate: string
  position: string
  phone: string
}
