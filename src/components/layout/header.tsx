import styles from "./layout.module.scss"

const Header = () => {
  return (
    <header className={styles.header}>
      <div>
        <img src="/abb-logo.png" height="50px" />
      </div>
      <span></span>
      <h1>Challenge Task</h1>
    </header>
  )
}

export default Header
