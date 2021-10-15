import React from "react"
import { Skeleton } from "primereact/skeleton"
import { makeArray } from "utils"

type LoaderProps = {
  rowCount?: number
  cellCount?: number
}

export const TableSkeletonLoader = (props: LoaderProps) => {
  const { rowCount = 1, cellCount = 1 } = props

  return (
    <>
      {makeArray(rowCount).map((_, rowIndex) => (
        <tr key={rowIndex}>
          {makeArray(cellCount).map((_, cellIndex) => (
            <td key={cellIndex}>
              <Skeleton height="20px" />
            </td>
          ))}
        </tr>
      ))}
    </>
  )
}
