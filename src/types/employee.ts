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
  name: string
  surname: string
  birthDate: string | Date
  position: string
  phone: string
}
