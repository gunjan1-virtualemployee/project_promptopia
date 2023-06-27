"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, useProviders, getProviders } from 'next-auth/react'

const Nav = () => {

  const { data : session} = useSession()

  const [providers, setProviders] = useState(null)
  const [toggleDropdown, setToggleDropdown] = useState(false)

  useEffect(() => {
    const setUpProvider = async () => {
      const res = await getProviders();
      setProviders(res)
    }
    setUpProvider()
  }, [])

  return (

    // desktop
    <nav className='flex-between w-full mb-16 mt-5'>
      <Link href={"/"} className='flex gap-2 flex-center'>
        <Image
          src="/assets/images/logo.svg"
          alt='Promptopia'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>Promptopia</p>
      </Link>

      {/* Desktop */}
      <div className='sm:flex hidden'>
        {
          session?.user ? (
            <div className='flex gap-3 md:gap-5' >
              <Link className='black_btn' href="/create-prompt">Create Post</Link>
              <button type='button' onClick={signOut} className='outline_btn'>
                Sign Out
              </button>
              <Link href="/">
                <Image
                  src={session?.user.image}
                  width={37}
                  height={37}
                  className='rounded-full'
                  alt='profile'
                  onClick={() => setToggleDropdown((prev) => !prev)}
                />
                {toggleDropdown && (
                  <div className='dropdown'>
                    <Link
                      href="/profile"
                      className='dropdown_link'
                      onClick={() => setToggleDropdown(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/create-prompt"
                      className='dropdown_link'
                      onClick={() => setToggleDropdown(false)}
                    >
                      Create Prompt
                    </Link>
                    <button type='button'
                      className='mt-5 w-full black_btn'
                      onClick={() => {
                        setToggleDropdown(false);
                        signOut()
                      }}>
                      Sign Out
                    </button>
                  </div>
                )}
              </Link>
            </div>
          ) : (
            <>
              {
                providers && Object.values(providers).map((provider) => (
                  <button
                    type='button'
                    key={provider.name}
                    className='black_btn'
                    onClick={() => signIn(provider.id)}
                  >
                    Sign In
                  </button>
                ))
              }
            </>
          )
        }
      </div>
    </nav>
  )
}

export default Nav
