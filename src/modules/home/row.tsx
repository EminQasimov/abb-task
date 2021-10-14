import React from "react"
import { Employee } from "types/employee"
import formatDate from "utils/format-date"
import { Inplace, InplaceDisplay, InplaceContent } from "primereact/inplace"
import { InputText } from "primereact/inputtext"
import { Calendar } from "primereact/calendar"
import { Button } from "primereact/button"
import Highlighter from "react-highlight-words"
import useFetch from "hooks/useFetch"

const UsernameTd = (props: { name: string; search: string }) => {
  const { name } = props

  return (
    <td>
      <Inplace
        closable
        // active={false}
        // onToggle={(e) => setActive(e.value)}
      >
        <InplaceDisplay>
          <Highlighter
            searchWords={[props.search]}
            autoEscape
            textToHighlight={name}
          />
        </InplaceDisplay>
        <InplaceContent>
          <InputText value={name} autoFocus />
        </InplaceContent>
      </Inplace>
    </td>
  )
}

const BirthDateTd = (props: { birthDate: string }) => {
  const { birthDate } = props
  return (
    <td>
      <Inplace closable>
        <InplaceDisplay> {formatDate(birthDate)}</InplaceDisplay>
        <InplaceContent>
          <Calendar visible={true} showIcon={false} showOnFocus />
        </InplaceContent>
      </Inplace>
    </td>
  )
}

type RowProps = {
  employee: Employee
  search?: string
  state: any
  loadData: () => void
}

export const Row = (props: RowProps) => {
  const { id, name, surname, birthDate, position, phone, deleted } =
    props.employee
  const { currentPage, search } = props.state

  const {
    isLoading,
    error,
    refetch: removeEmployee,
  } = useFetch({
    url: `/api/employees/${id}?page=${currentPage}&search=${search}`,
    fetchOptions: {
      method: "DELETE",
    },
    onSuccess: () => {
      props.loadData()
    },
  })

  return (
    <tr key={id} className={deleted ? "deleted" : ""}>
      <td>{id}</td>
      <UsernameTd name={name} search={props.search as string} />
      <td>
        <Highlighter
          searchWords={[props.search as string]}
          autoEscape
          textToHighlight={surname}
        />
      </td>
      <BirthDateTd birthDate={birthDate} />
      <td>{position}</td>
      <td>{phone}</td>
      <td>
        <Button
          label={deleted ? "Undo" : "Delete"}
          className={deleted ? "p-button-secondary" : "p-button-danger"}
          onClick={() => {
            removeEmployee()
          }}
        />
      </td>
    </tr>
  )
}
