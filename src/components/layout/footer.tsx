import Link from 'next/link'

const Footer = () => {
  return (
    <div>
      <div>
        &copy; {new Date().getFullYear()} -{' '}
        <Link href="https://emin-qasimov.web.app">Emin Qasimov</Link>
      </div>
    </div>
  )
}

export default Footer
