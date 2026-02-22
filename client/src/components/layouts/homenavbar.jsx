import { useGSAP } from '@gsap/react';
import React, { useState, useRef } from 'react'
import { HomeNavbarAnimation } from '../gsapAnimation';

export default function HomeNavbar() {

    const [openMenu, setOpenMenu] = useState(false)

    const navbarRef = useRef(null)
    const navContentRef = useRef(null)
    const mobileConRef = useRef(null)

    useGSAP(() => {
        if (openMenu) {
            HomeNavbarAnimation({mobileConRef})
        } else {
            HomeNavbarAnimation({ navbarRef, navContentRef })
        }
    }, [openMenu])

    return (
        <>
            <nav ref={navbarRef} className="z-20 flex justify-between items-center p-4 h-20 bg-[#1f2933]">
                <div className='text-xl font-bold text-blue-100'>
                    DocNet
                </div>

                <div ref={navContentRef} className='hidden md:flex justify-between space-x-6 font-medium '>
                    <a href='/' className='text-white text-decoration-none'> Home </a>
                    <a href='/login' className='text-white text-decoration-none '> SignIn </a>
                    <a href='/about' className=' text-white text-decoration-none'> About </a>
                    <a href='/contact' className='text-white text-decoration-none no-underline'> Contact/Info </a>
                </div>

                <div className="md:hidden">
                    <button
                        className='text-4xl px-4 py-2 focus:outline-2 rounded-2xl font-bold text-blue-200 '
                        onClick={() => setOpenMenu(!openMenu)}>
                        ☰
                    </button>
                </div>
            </nav>
            {openMenu && (
                <div ref={mobileConRef} className='md:hidden z-10 top-0 flex flex-col px-4 space-y-2 text-white font-medium bg-[#1f2933]'>
                    <a href='/' className='text-decoration-none text-white'> Home </a>
                    <a href='/login' className='text-decoration-none text-white'> SignIn </a>
                    <a href='/about' className='text-decoration-none text-white'> About </a>
                    <a href='/contact' className='text-decoration-none text-white mb-3'> Contact/Info </a>
                </div>
            )}
        </>
    )
}
