import React from 'react'
import useSwr from 'swr'
import { Tag } from 'primereact/tag'
import { Employee } from 'types/employee'
import { Calendar } from 'primereact/calendar'

import tabelLoader from './table-loader'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const Home = () => {
  const { data, error } = useSwr('/api/employees', fetcher)

  if (error) return <div>Failed to load employees</div>

  return (
    <div>
      <Calendar />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Date of birth</th>
            <th>Position</th>
            <th>Phone number</th>
          </tr>
        </thead>
        <tbody>
          {!data
            ? tabelLoader
            : data.map((user: Employee) => (
                <tr key={user.id}>
                  <td>
                    <Tag>{user.id}</Tag>
                  </td>
                  <td>{user.name}</td>
                  <td>{user.surname}</td>
                  <td>{user.birthDate}</td>
                  <td>{user.position}</td>
                  <td>{user.phone}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  )
}

export default Home
