import React from 'react'
import { DefaultSession } from 'next-auth'

const UserCard = ({ user }: { user: DefaultSession['user']}) => {
  return (
    <div>
        <p>Current Login User</p>
        <p>{user?.name} </p>
        <p>{user?.email} </p>
    </div>
  )
}

export default UserCard