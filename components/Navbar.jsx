'use client';
import { useState, useEffect } from 'react';
import { usePathname  } from 'next/navigation';
import React from 'react'
import '@/assets/styles/header.css';
import Link from 'next/link';
import {signIn, signOut, useSession, getProviders} from 'next-auth/react'
import Image from 'next/image';

const Navbar = () => {
    const {data: session} = useSession();
    const profileImage = session?.user?.image;

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [providers, setProviders] = useState(false);
    
    const pathname = usePathname();

    useEffect(() => {
        const setAuthProviders = async () => {
            const res = await getProviders();
            setProviders(res);
        }

        setAuthProviders();
    }, [])


  return (
    <header className="container header">
        <nav>
            <ul className='header__menu'>
                <li>
                    <Link className={`header__link ${pathname === '/' ? 'active' : ''}`} href="/">Home</Link>
                </li>
                <li>
                    <Link className={`header__link ${pathname === '/hikes' ? 'active' : ''}`} href="/hikes">Hike</Link>
                </li>
                { session && (
                    <li>
                        <Link className={`header__link ${pathname === '/hikes/add' ? 'active' : ''}`} href="/hikes/add">Create</Link>
                    </li>
                )}
                { !session && (
                    <li>
                        {providers && Object.values(providers).map((provider, i) => (
                        <button onClick={() => signIn(provider.id)} key={i} className='header__link' href="">Login or Register</button>
                        ))}
                    </li>
                )}
                {/* { session && {
                    
                }}
                <li>
                    <button
                        className='header__link'
                        onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                        >
                        <Image 
                            src={profileImage}
                            width={40}
                            height={40}
                        />
                    </button>
                </li> */}
                {session && (
                    <li>
                        <button
                        className='header__link dropdown_button'
                        onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                        >
                        <Image 
                            src={profileImage}
                            alt="Profile Image"
                            width={40}
                            height={40}
                            className="profile_image"
                        />
                        </button>
                    </li>
                )}
                {isProfileMenuOpen && (
                    <div className="dropdown-menu">
                        <ul>
                            <li>
                                <Link 
                                    onClick={() => {
                                        setIsProfileMenuOpen(false);
                                    }}
                                    href="/profile">
                                    View Profile
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    onClick={() => {
                                        setIsProfileMenuOpen(false);
                                    }}
                                    href="/hikes/saved">
                                    Saved Hikes
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={() => {
                                        setIsProfileMenuOpen(false);
                                        signOut();
                                    }}
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </ul>
            <button 
                className={`header__burger ${ isMobileMenuOpen ? 'cross' : ''}`}
                onClick = {() => setIsMobileMenuOpen((prev) => !prev)}>
                <span></span>
            </button>
        </nav>

        {/* Mobile Nav */}
        <div className={`mobile-nav ${ isMobileMenuOpen ? 'open' : ''}`}>
            <nav>
                <ul className='mobile-nav__menu'>
                    <li>
                        <Link 
                            className={`mobile-nav__link ${pathname === '/' ? 'active' : ''}`}
                            href="/"
                            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                            >Home</Link>
                    </li>
                    <li>
                        <Link className=
                            {`mobile-nav__link ${pathname === '/hikes' ? 'active' : ''}`} href="/hikes"
                            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                            >Hike
                        </Link>
                    </li>
                    { session && (
                        <li>
                            <Link className=
                                {`mobile-nav__link ${pathname === '/hikes/add' ? 'active' : ''}`} 
                                href="/hikes/add"
                                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                                >Create
                            </Link>
                        </li>
                    )}
                    
                    { !session && (
                        <li>
                            {providers && Object.values(providers).map((provider, i) => (
                            <button onClick={() => signIn(provider.id)} key={i} className='mobile-nav__link' href="">Login or Register</button>
                            ))}
                        </li>
                    )}
                    
                    {session && (
                        <>
                            <li>
                                <Link
                                    className='mobile-nav__link' 
                                    href="/profile">
                                    View Profile
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    className='mobile-nav__link' 
                                    href="/hikes/saved">
                                    Saved Hikes
                                </Link>
                            </li>
                            <li>
                                <button
                                    className='mobile-nav__link' 
                                    onClick={() => {
                                        setIsProfileMenuOpen(false);
                                        signOut();
                                    }}
                                >
                                    Logout
                                </button>
                            </li>
                    </>
                    )}
                </ul>
            </nav>
        </div>
        
    </header>
       
  )
}

export default Navbar