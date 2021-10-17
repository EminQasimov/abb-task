const Footer = () => {
  return (
    <div style={{ margin: '60px auto', maxWidth: 200 }}>
      &copy; {new Date().getFullYear()} -{' '}
      <a href="https://emin-qasimov.web.app" target="_blank" rel="noreferrer">
        Emin Qasimov
      </a>
    </div>
  )
}

export default Footer
