import { ReactNode } from 'react'

import Footer from './footer'
import Header from './header'

import styles from './layout.module.scss'

type LayoutProps = {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.layoutContainer}>
      <div>
        <Header />
        <main className={styles.layoutContent}>{children}</main>
        <Footer />
      </div>
    </div>
  )
}
