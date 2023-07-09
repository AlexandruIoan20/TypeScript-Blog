import React, { useEffect } from 'react'
import { DefaultSession } from 'next-auth'; 
import AuthButton from '../buttons/AuthButton';
import Link from 'next/link';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

const UserCard = ({ user }: { user: DefaultSession["user"] | any }) => {
  useEffect( () => { console.log(user)}, [])
  return (
    <div className = 'flex py-1'>
    <AuthButton 
        name = 'Sign Out'
        executeFunction={ signOut }
        classes = 'sign-button text-xs' 
    /> 

    <Link href = { `/users/${user?.id}`}>
        <Image
            src = { user?.image } 
            alt = "profile_image"
            width = { 35 }
            height = { 35 }
            className = 'rounded-3xl ml-3'
        />
    </Link>
  </div>
  )
}

export default UserCard