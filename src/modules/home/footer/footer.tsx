import React, { useState } from "react"
import { Paginator, PaginatorPageState } from "primereact/paginator"
import { Dialog } from "primereact/dialog"

import styles from "./footer.module.scss"

type FooterProps = {
  totalEmployeesCount: number
  currentPage: number
  onPageChange: (e: PaginatorPageState) => void
  refetch: () => void
}

export default function Footer(props: FooterProps) {
  const { totalEmployeesCount, currentPage, onPageChange, refetch } = props
  const [submitData, setSubmitData] = useState(null)

  function handleReset() {
    fetch("/api/employees", {
      method: "POST",
    }).then(() => {
      refetch()
    })
  }

  function handleSubmit() {
    fetch("/api/employees/submit")
      .then((res) => res.json())
      .then((data) => {
        setSubmitData(data)
      })
  }

  return (
    <>
      <div className={styles.footer}>
        <div>
          Found{" "}
          <strong className={styles.resultCount}>{totalEmployeesCount}</strong>{" "}
          results
        </div>
        <div>
          <Paginator
            // Zero-relative number of the first row to be displayed.
            first={(currentPage - 1) * 10}
            // Data count to display per page.
            rows={10}
            totalRecords={totalEmployeesCount}
            onPageChange={onPageChange}
          />
        </div>

        <div>
          <button
            onClick={handleReset}
            className={`${styles.button} ${styles.resetButton}`}
          >
            Reset data
          </button>
          <button
            onClick={handleSubmit}
            className={`${styles.button} ${styles.submitButton}`}
          >
            Submit{" "}
          </button>
        </div>
      </div>

      <Dialog
        visible={!!submitData}
        header="Submitted data"
        style={{ width: "50vw" }}
        onHide={() => {
          setSubmitData(null)
        }}
      >
        <pre>{JSON.stringify(submitData, null, 2)}</pre>
      </Dialog>
    </>
  )
}
