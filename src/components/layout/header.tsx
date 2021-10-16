import { LinkIcon } from "assets/icons"
import styles from "./layout.module.scss"

const Header = () => {
  return (
    <header className={styles.header}>
      <div>
        <img src="/abb-logo.png" height="50px" />
      </div>
      <span />
      <h1>Challenge Task </h1>
      <span />
      <a href="https://emin-qasimov.web.app" target="_blank">
        Emin Qasimov <LinkIcon fontSize={16} />
      </a>
    </header>
  )
}

export default Header
