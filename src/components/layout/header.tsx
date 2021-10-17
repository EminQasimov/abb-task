/* eslint-disable @next/next/no-img-element */
import { LinkIcon } from 'assets/icons'
import styles from './layout.module.scss'

const Header = () => {
  return (
    <header className={styles.header}>
      <div>
        <img src="/abb-logo.png" height="50px" alt="logo" />
      </div>
      <span />
      <h1>Challenge Task </h1>
      <span />
      <a href="https://emin-qasimov.web.app" target="_blank" rel="noreferrer">
        Emin Qasimov <LinkIcon fontSize={16} />
      </a>
    </header>
  )
}

export default Header
