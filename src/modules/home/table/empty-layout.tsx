/* eslint-disable @next/next/no-img-element */
import styles from './table.module.scss'

export const EmptyLayout = ({
  children,
  colSpan,
}: {
  children: any
  colSpan: number
}) => {
  return (
    <tr>
      <td colSpan={colSpan}>
        <div className={styles.emptyState}>
          <img src="/empty.png" alt="" width="180px" />
          {children}
        </div>
      </td>
    </tr>
  )
}
