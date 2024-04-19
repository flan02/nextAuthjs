// TODO This page will be rendered as a server component

import Navbar from '@/components/Navbar'
import Users from "@/components/Users"

type Props = {}

const HomePage = async (_props: Props) => {


  return (
    <>
      <h1>
        HomePage
      </h1>
      <Navbar /> {/* This page will have a 'use server' component. */}
      <Users /> {/* This page will have a 'use client' component. */}
    </>
  )
}

export default HomePage