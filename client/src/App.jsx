import { ToastContainer } from 'react-toastify';
import { Routes, Route, Navigate } from 'react-router-dom'
import React, { Suspense, useState, useEffect, useRef, useMemo } from 'react';
import Lottie from 'lottie-react'
import Loading from './assets/Loading.json'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import AuthContext from './context/authContext';
import { jwtDecode } from 'jwt-decode';
import ProtectedRoutes from './routes/ProtectedRoutes';

const Home = React.lazy(() => import('./pages/common/home'))
const Login = React.lazy(() => import('./pages/common/login'))
const RegistrationPage = React.lazy(() => import('./pages/common/registration'))
const About = React.lazy(() => import('./pages/common/about'))
const ForgotPassword = React.lazy(() => import('./pages/common/forgotpassword'))
const Contact = React.lazy(() => import('./pages/common/contact'))
const Errorpage = React.lazy(() => import('./components/layouts/errorPage'))

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
const Schedule = React.lazy(() => import('./pages/doctor/schedule'))
const DoctorViewAppointment = React.lazy(() => import('./pages/doctor/viewappointment'))
const AddPrescription = React.lazy(() => import('./pages/doctor/addprescription'))
const ViewPrescription = React.lazy(() => import('./pages/doctor/viewprescription'))
const AppointmentHistory = React.lazy(() => import('./pages/doctor/appointmenthistory'))
const DoctorSeeFeedback = React.lazy(() => import('./pages/doctor/doctorfeedback'))

function App() {
  const LottieRef = useRef()

  const [role, setRole] = useState('')
  const decodedToken = useMemo(() => localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token')) : null, [])

  useEffect(() => {
    if (LottieRef.current) {
      LottieRef.current.goToAndPlay(10, true)
      LottieRef.current.setSpeed(2)
    }

    const isLoggedIn = decodedToken ? decodedToken.role : null
    setRole(isLoggedIn)
  }, [decodedToken])

  return (
    <>
      <Suspense fallback={
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', height: '800px', width: '100%' }}>
          <Lottie lottieRef={LottieRef} animationData={Loading} style={{ height: 300, width: 300 }} />
          <br />
          <h4 style={{ marginTop: '100px', position: 'absolute' }}>Loading...</h4>
        </div>}>

        <AuthContext.Provider value={{ role, setRole }} >
          <Routes>

            {/* COMMON PAGES */}
            {!role && <>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/registration' element={<RegistrationPage />} />
              <Route path='/about' element={<About />} />
              <Route path='/forgotpassword' element={<ForgotPassword />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='*' element={<Errorpage />} />
            </>}

            <Route element={<ProtectedRoutes />}>
              <Route path='/login' element={<Navigate to={'/'} />} />
              <Route path='/registration' element={<Navigate to={'/'} />} />
              <Route path='/about' element={<Navigate to={'/'} />} />
              <Route path='/forgotpassword' element={<Navigate to={'/'} />} />
              <Route path='/contact' element={<Navigate to={'/'} />} />
              <Route path='*' element={<Errorpage />} />

              {/* ADMIN PAGES */}
              {role === 'admin' && <>
                <Route path='/' element={<Navigate to={'/adminhome'} />} />
                <Route path='/adminhome' element={<Adminhome />} />
                <Route path='/adminviewusers' element={<AdminViewUsers />} />
                <Route path='/adminviewdoctors' element={<AdminViewDoctors />} />
              </>}

              {role === 'patient' && <>
                {/* USER PAGES */}
                <Route path='/' element={<Navigate to={'/userhome'} />} />
                <Route path='/userhome' element={<Userhome />} />
                <Route path='/userprofile' element={<UserProfile />} />
                <Route path='/appointment' element={<Appointment />} />
                <Route path='/getprescription' element={<GetMyPrescription />} />
                <Route path='/seealldoctors' element={<SeeAllDoctors />} />
                <Route path='/userfeedback' element={<UserFeedback />} />
              </>}

              {role === 'doctor' && <>
                {/* DOCTOR PAGES */}
                <Route path='/' element={<Navigate to={'/doctorhome'} />} />
                <Route path='/doctorhome' element={<Doctorhome />} />
                <Route path='/doctorprofile' element={<DoctorProfile />} />
                <Route path='/schedule' element={<Schedule />} />
                <Route path='/viewappointment' element={<DoctorViewAppointment />} />
                <Route path='/addprescription/:id' element={<AddPrescription />} />
                <Route path='/viewprescription' element={<ViewPrescription />} />
                <Route path='/appointmenthistory' element={<AppointmentHistory />} />
                <Route path='/doctorfeedback' element={<DoctorSeeFeedback />} />
              </>}
            </Route>

          </Routes>
        </AuthContext.Provider>
      </Suspense>
      <ToastContainer position="top-center" newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable autoClose={1000} />
    </>
  )
}


export default App
