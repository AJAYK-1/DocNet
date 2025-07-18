import React, { useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useGSAP } from '@gsap/react'
import { HomeNavbarAnimation } from '../gsapAnimation';
import { jwtDecode } from 'jwt-decode';


export default function DoctorNavbar() {

    const [openMenu, setOpenMenu] = useState(false)
    const [dropDown, setDropDown] = useState(false)
    const [dropDown2, setDropDown2] = useState(false)

    const decoded = useMemo(() => {
        const token = localStorage.getItem('token');
        return jwtDecode(token);
    }, [])

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

            <nav ref={navbarRef} className="flex justify-between items-center p-4 h-20 bg-[#1f2933]">
                <div className='text-xl font-bold text-blue-100'>
                    DocNet
                </div>

                <div ref={navContentRef} className='hidden md:flex justify-between space-x-6 font-medium '>
                    <a href='/doctorhome' className='text-white text-decoration-none'> Home </a>
                    <div>
                        <button className='relative text-white'
                            onClick={() => setDropDown2(!dropDown2)}> Appointments▾ </button>
                        {dropDown2 && (
                            <div className="absolute flex flex-col w-35 mt-2 p-2 z-6 shadow-md rounded bg-[#1e2329]">
                                <a href="/viewappointment" className='mb-2 text-white text-decoration-none text-center'> New </a>
                                <a href="/appointmenthistory" className='mb-2 text-white text-decoration-none text-center'> History </a>
                            </div>
                        )}
                    </div>

                    <a href='/viewprescription' className='text-white text-decoration-none '> Prescriptions </a>

                    <div>
                        <button className='relative text-white'
                            onClick={() => setDropDown(!dropDown)}> Profile▾ </button>
                        {dropDown && (
                            <div className="absolute flex flex-col w-35 mt-2 p-2 z-6 shadow-md rounded bg-[#1e2329]">
                                <a href="/doctorprofile" className='mb-2 text-white text-decoration-none text-center'> My Profile</a>
                                <button className='text-white mb-1'
                                    onClick={handleLogout}>Logout</button>
                            </div>
                        )}
                    </div>
                    <a href='/doctorfeedback' className='text-white text-decoration-none no-underline'> Feedback </a>
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
                <div ref={mobileConRef} className='md:hidden flex flex-col px-4 space-y-3 text-white font-medium bg-[#1f2933]'>
                    <a href='/doctorhome' className='text-decoration-none text-white'> Home </a>
                    <div>
                        <button className='relative text-white'
                            onClick={() => setDropDown2(!dropDown2)}> Appointments▾ </button>
                        {dropDown2 && (
                            <div className="absolute flex flex-col w-35 mt-2 p-2 z-6 shadow-md rounded bg-[#1e2329]">
                                <a href="/viewappointment" className='mb-2 text-white text-decoration-none text-center'> New </a>
                                <a href="/appointmenthistory" className='mb-2 text-white text-decoration-none text-center'> History </a>
                            </div>
                        )}
                    </div>
                    <a href='/viewprescription' className='text-decoration-none text-white'> Prescriptions </a>
                    <div>
                        <button className='relative text-white'
                            onClick={() => setDropDown(!dropDown)}> Profile▾ </button>
                        {dropDown && (
                            <div className="absolute flex flex-col w-35 mt-2 p-2 z-6 shadow-md rounded bg-[#1e2329]">
                                <a href="/doctorprofile" className='mb-2 text-white text-decoration-none text-center'> My Profile</a>
                                <button className='text-white mb-1'
                                    onClick={handleLogout}>Logout</button>
                            </div>
                        )}
                    </div>
                    <a href='/doctorfeedback' className='text-white text-decoration-none mb-3'> Feedback </a>
                </div>
            )}

        </>
    )
}
