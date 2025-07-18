import React from 'react';
import { FaInstagram, FaLinkedin, FaGithub, FaEnvelope, FaGlobe, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import Docnetlogo from '../assets/docnetlogo.png'


export default function Footer() {
  return (
    <>
      <footer className='bg-[#2c3e50] text-white px-5 py-5'>
        <div className='max-w-6xl mx-auto grid grid-cols-1 divide-y-1 md:divide-y-0 md:grid-cols-3 md:divide-x-2 gap-8'>
          <div className=' md:pr-6 px-4 py-2'>
            <h2 className='flex items-center text-lg font-bold'> 
              <img src={Docnetlogo} alt="Logo" className='w-8 h-8 me-2' /> DocNet 
              </h2>
            <p className='text-sm'>An online doctor's appointment booking system</p>
            <p className='flex items-center'>
              <FaGlobe className="me-2 fs-5" />
              <a
                href="https://docnet-mxnp.onrender.com/"
                target="_blank"
                rel="noreferrer"
                className="text-light text-decoration-none"
              >
                www.docnet.com
              </a></p>
            <p> My social media handles: </p>
            <div className='flex'>
              <a
                href="https://www.instagram.com/njan.ajay/"
                target="_blank"
                rel="noreferrer"
                className="text-light me-3 fs-3 "
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.linkedin.com/in/ajaykumartp"
                target="_blank"
                rel="noreferrer"
                className="text-light me-3 fs-3 "
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/AJAYK-1"
                target="_blank"
                rel="noreferrer"
                className="text-light fs-3"
              >
                <FaGithub />
              </a>
            </div>
          </div>

          <div className=' md:pr-6 md:pl-6 px-4 py-4'>
            <ul className='space-y-2 text-sm'>
              <li><a href="#" className='text-white text-decoration-none'> Services </a></li>
              <li><a href="/" className='text-white text-decoration-none'> Home </a></li>
              <li><a href="/contact" className='text-white text-decoration-none'> Contact </a></li>
              <li><a href="/about" className='text-white text-decoration-none'> About </a></li>
              <li><a href="/login" className='text-white text-decoration-none'> SignIn </a></li>
            </ul>
          </div>

          <div className='md:pl-6 px-4 py-5 '>
            <ul className='space-y-2'>
              <li className='flex items-center'>
                <FaEnvelope className="me-3 fs-5" />
                <a href="mailto:ajaykumartp10@gmail.com" className='text-white text-decoration-none'>
                  ajaykumartp10@gmail.com
                </a>
              </li>
              <li className='flex items-center'><FaPhoneAlt className="me-3 text-lg" /> +91-8289938749</li>
              <li className='flex items-center'><FaMapMarkerAlt className="me-3 text-lg" /> Kochi, Kerala, India</li>
            </ul>

          </div>
        </div>
        <div className='mt-5 border-t border-white pt-5 text-center text-sm'>
          © {new Date().getFullYear()} DocNet. All rights reserved.
        </div>

      </footer>
    </>
  );
}
