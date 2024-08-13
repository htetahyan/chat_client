
import React from 'react'
import { usersApi } from '~/actions/query/UsersApi'
import TableUsers from '~/components/users/Table'
import store from '~/store'

const page = () => {
  store.dispatch(usersApi.endpoints.getUsersList.initiate({ page: 0, name: '', role: '', status: '' }))
  return (
    <div className='h-screen w-[90vw] overflow-y-scroll overflow-x-hidden p-3'>
      
        <TableUsers/></div>
  )
}

export default page