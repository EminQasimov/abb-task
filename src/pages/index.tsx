import Head from "next/head"
import HomeModule from "modules/home"
import db from "utils/db"
// import sleep from 'utils/sleep'

import "primereact/resources/themes/saga-blue/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"

import { GetServerSideProps } from "next"

const Home = ({ employees, totalEmployeesCount }: any) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomeModule
        employees={employees}
        totalEmployeesCount={totalEmployeesCount}
      />
    </>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { page, limit, search } = query
  const data = db.getEmployees(page, limit, search)

  // await sleep(4000)

  return {
    props: data,
  }
}
