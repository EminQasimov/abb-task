import { ReactNode } from "react"

import Footer from "./footer"
import Header from "./header"

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout-container">
      <div>
        <Header />
        <main className="layout-content">{children}</main>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
