import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom'
import React, { Suspense, useEffect } from 'react';
import Lottie from 'lottie-react'
import Loading from './assets/Loading.json'
import ErrorPage from './assets/ErrorPage.json'
import { useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

const Home = React.lazy(() => import('./pages/common/home'))
const Login = React.lazy(() => import('./pages/common/login'))
const RegistrationPage = React.lazy(() => import('./pages/common/registration'))
const About = React.lazy(() => import('./pages/common/about'))
const ForgotPassword = React.lazy(() => import('./pages/common/forgotpassword'))
const Contact = React.lazy(() => import('./pages/common/contact'))

const Adminhome = React.lazy(() => import('./pages/admin/adminhome'))
const AdminViewUsers = React.lazy(() => import('./pages/admin/adminviewusers'))
const AdminViewDoctors = React.lazy(() => import('./pages/admin/adminviewdoctors'))

const Userhome = React.lazy(() => import("./pages/patient/userhome"))
const UserProfile = React.lazy(() => import('./pages/patient/userprofile'))
const Appointment = React.lazy(() => import('./pages/patient/appointment'))
const GetMyPrescription = React.lazy(() => import('./pages/patient/getprescription'))
const SeeAllDoctors = React.lazy(() => import('./pages/patient/seealldoctors'))
const UserFeedback = React.lazy(() => import('./pages/patient/userfeedback'))

const Doctorhome = React.lazy(() => import("./pages/doctor/doctorhome"))
const DoctorProfile = React.lazy(() => import('./pages/doctor/doctorprofile'))
const DoctorViewAppointment = React.lazy(() => import('./pages/doctor/viewappointment'))
const AddPrescription = React.lazy(() => import('./pages/doctor/addprescription'))
const ViewPrescription = React.lazy(() => import('./pages/doctor/viewprescription'))
const AppointmentHistory = React.lazy(() => import('./pages/doctor/appointmenthistory'))
const DoctorSeeFeedback = React.lazy(() => import('./pages/doctor/doctorfeedback'))

function App() {
  const LottieRef = useRef()

  useEffect(() => {
    if (LottieRef.current) {
      LottieRef.current.goToAndPlay(10, true)
      LottieRef.current.setSpeed(2)
    }
  }, [])

  return (
    <>
      <Suspense fallback={
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', height: '800px', width: '100%' }}>
          <Lottie lottieRef={LottieRef} animationData={Loading} style={{ height: 300, width: 300 }} />
          <br />
          <h4 style={{ marginTop: '100px', position: 'absolute' }}>Loading...</h4>
        </div>}>
        <Routes>

          {/* COMMON PAGES */}
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/registration' element={<RegistrationPage />} />
          <Route path='/about' element={<About />} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/*' element={<Lottie animationData={ErrorPage} style={{ height: '800px' }} />} />

          {/* ADMIN PAGES */}
          <Route path='/adminhome' element={<Adminhome />} />
          <Route path='/adminviewusers' element={<AdminViewUsers />} />
          <Route path='/adminviewdoctors' element={<AdminViewDoctors />} />

          {/* USER PAGES */}
          <Route path='/userhome' element={<Userhome />} />
          <Route path='/userprofile' element={<UserProfile />} />
          <Route path='/appointment' element={<Appointment />} />
          <Route path='/getprescription' element={<GetMyPrescription />} />
          <Route path='/seealldoctors' element={<SeeAllDoctors />} />
          <Route path='/userfeedback' element={<UserFeedback />} />

          {/* DOCTOR PAGES */}
          <Route path='/doctorhome' element={<Doctorhome />} />
          <Route path='/doctorprofile' element={<DoctorProfile />} />
          <Route path='/viewappointment' element={<DoctorViewAppointment />} />
          <Route path='/addprescription/:id' element={<AddPrescription />} />
          <Route path='/viewprescription' element={<ViewPrescription />} />
          <Route path='/appointmenthistory' element={<AppointmentHistory />} />
          <Route path='/doctorfeedback' element={<DoctorSeeFeedback />} />

        </Routes>
      </Suspense>
      <ToastContainer position="top-center" newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable autoClose={1000} />
    </>
  )
}


export default App
