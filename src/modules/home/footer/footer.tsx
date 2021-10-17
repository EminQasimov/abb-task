import React, { useState } from 'react'
import { Paginator, PaginatorPageState } from 'primereact/paginator'
import { Dialog } from 'primereact/dialog'
import { LIMIT } from 'configs'

import styles from './footer.module.scss'

type FooterProps = {
  totalEmployeesCount: number
  page: number
  onPageChange: (e: PaginatorPageState) => void
  refetch: () => void
}

export default function Footer(props: FooterProps) {
  const { totalEmployeesCount, page, onPageChange, refetch } = props
  const [submitData, setSubmitData] = useState(null)

  function handleReset() {
    fetch('/api/employees', {
      method: 'POST',
    }).then(() => {
      refetch()
    })
  }

  // get updated and deleted employees list for view as json
  function handleSubmit() {
    fetch('/api/employees/submit')
      .then((res) => res.json())
      .then((data) => {
        setSubmitData(data)
      })
  }

  return (
    <div className={styles.footer}>
      <div>
        Found
        <strong className={styles.resultCount}>{totalEmployeesCount}</strong>
        results
      </div>

      <Paginator
        // Zero-relative number of the first row to be displayed.
        first={(page - 1) * LIMIT}
        rows={LIMIT}
        totalRecords={totalEmployeesCount}
        onPageChange={onPageChange}
      />

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
          Submit
        </button>
      </div>

      <Dialog
        visible={!!submitData}
        header="Submitted data"
        onHide={() => {
          setSubmitData(null)
        }}
      >
        <pre>{JSON.stringify(submitData, null, 2)}</pre>
      </Dialog>
    </div>
  )
}
