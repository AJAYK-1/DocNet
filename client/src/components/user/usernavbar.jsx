import { useGSAP } from '@gsap/react';
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { HomeNavbarAnimation } from '../gsapAnimation';


export default function UserNavbar() {

    const [openMenu, setOpenMenu] = useState(false)
    const [dropDown, setDropDown] = useState(false)

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate("/login")
    }

    const navbarRef = useRef(null)
    const navContentRef = useRef(null)
    const mobileConRef = useRef(null)

    useGSAP(() => {
        if (openMenu) {
            HomeNavbarAnimation({ mobileConRef })
        } else {
            HomeNavbarAnimation({ navbarRef, navContentRef })
        }
    }, [openMenu])

    return (
        <>
            <nav ref={navbarRef} className="flex justify-between items-center p-4 h-20 z-20 bg-[#1f2933]">
                <div className='text-xl font-bold text-blue-100'>
                    DocNet
                </div>

                <div ref={navContentRef} className='hidden md:flex justify-between space-x-6 font-medium '>
                    <a href='/userhome' className=' text-white text-decoration-none'> Home </a>
                    <a href='/seealldoctors' className=' text-white text-decoration-none '> Find Doctors </a>
                    <a href='/appointment' className=' text-white text-decoration-none'> My Appointments </a>
                    <a href='/getprescription' className=' text-white text-decoration-none no-underline'> Presciptions </a>
                    <div>
                        <button className='hover:underline relative text-white'
                            onClick={() => setDropDown(!dropDown)}> Profile▾ </button>
                        {dropDown && (
                            <div className="absolute flex flex-col w-35 mt-2 p-2 z-[999] shadow-md rounded bg-[#1e2329]">
                                <a href="/userprofile" className='mb-2 text-white text-decoration-none text-center'> My Profile</a>
                                <button className='text-white'
                                    onClick={handleLogout}>Logout</button>
                            </div>
                        )}
                    </div>
                    <a href='/userfeedback' className=' text-white text-decoration-none no-underline'> Feedback </a>
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
                <div ref={mobileConRef} className='md:hidden flex flex-col px-4 pb-3 space-y-3 z-20 text-white font-medium bg-[#1f2933]'>
                    <a href='/userhome' className='text-decoration-none text-white'> Home </a>
                    <a href='/seealldoctors' className='text-decoration-none text-white'> Find Doctors </a>
                    <a href='/appointment' className='text-decoration-none text-white'> My Appointments </a>
                    <a href='/getprescription' className='text-decoration-none text-white'> Presciptions </a>
                    <a href='/userfeedback' className='text-white text-decoration-none mb-3'> Feedback </a>
                    <div className='relative'>
                        <button className='hover:underline text-white'
                            onClick={() => setDropDown(!dropDown)}> Profile▾ </button>
                        {dropDown && (
                            <div className="absolute flex flex-col w-40  p-2 z-[999] shadow-md rounded bg-[#1e2329]">
                                <a href="/userprofile" className='mb-2 text-white text-decoration-none text-center'> My Profile</a>
                                <button className='text-white'
                                    onClick={handleLogout}>Logout</button>
                            </div>
                        )}
                    </div>
                    
                </div>
            )}

        </>
    )
}
