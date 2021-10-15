import HomeModule, { PageProps } from "modules/home/home"
import * as db from "db"

import { GetServerSideProps } from "next"

import "primereact/resources/themes/saga-blue/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"

export default function Home(props: PageProps) {
  return <HomeModule {...props} />
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { page, limit, search, filter } = query
  const data = db.getEmployees({ page, limit, search, filter })

  return {
    props: data,
  }
}
