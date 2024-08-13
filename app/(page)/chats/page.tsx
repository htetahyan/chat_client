import React from 'react'
import TableUsers from '~/components/users/Table'

const page = () => {
  return (
    <div className='h-screen w-[75vw] overflow-y-scroll overflow-x-hidden p-3'>
      <TableUsers/>
    </div>
  )
}

export default page