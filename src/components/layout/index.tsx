import { ReactNode } from 'react'
import Footer from './Footer'
import Header from './Header'

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <div>
        <Header />
        <div>{children}</div>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
