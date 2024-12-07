import Link from 'next/link'
import React from 'react'
import {auth} from "@/auth"
import { signIn, signOut } from 'next-auth/react';
import LoginButton from './Loginbutton';
import LogoutButton from './Logoutbutton';

const Navbar =async () => {
    const session =  await auth();

  return (
    <header className='px-5 bg-white shadow-sm font-work-sans'>
        <nav className='flex justify-between items-center'>
            <a href="/">
              <img src="/logo.PNG" alt="logo" width={144} height={30}/>
            </a>
            <div className='flex gap-5 items-center text-black'>

                {session && session?.user?(
                    <>
                        <a href="/create">
                            <span>Create</span>
                        </a>
                        <LogoutButton/>
                        <a href={`/user/${session.user.id}`}>
                            <span>{session?.user?.name}</span>
                        </a>
                    </>
                ):(
                    <LoginButton />
                )}
            </div>
        </nav>
    </header>
  )
}

export default Navbar