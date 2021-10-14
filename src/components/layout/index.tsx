import { ReactNode, useEffect } from 'react'
import NProgress from 'nprogress'

import Footer from './footer'
import Header from './header'

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  // const isFetching = useIsFetching()

  // useEffect(() => {
  //   console.log(isFetching)

  //   if (isFetching) {
  //     NProgress.start()
  //   } else {
  //     NProgress.done()
  //   }
  // }, [isFetching])

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
