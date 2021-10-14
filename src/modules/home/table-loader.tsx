import { Skeleton } from 'primereact/skeleton'
import { nanoid } from 'nanoid'
import React from 'react'

const rowCount = 10

const tabelLoader = [...Array(rowCount)].map(() => {
  const td = (
    <td>
      <Skeleton height="20px" />
    </td>
  )

  return (
    <tr key={nanoid(10)}>
      {td}
      {td}
      {td}
      {td}
      {td}
      {td}
    </tr>
  )
})

export default tabelLoader
