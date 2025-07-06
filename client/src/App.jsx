import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom'
import React, { Suspense } from 'react';
import Loadinggif from './assets/loading.gif'

const Home = React.lazy(() => import('./components/home'))
const Login = React.lazy(() => import('./components/login'))
const RegistrationPage = React.lazy(() => import('./components/registration'))
const About = React.lazy(() => import('./components/about'))

const Adminhome = React.lazy(() => import('./components/admin/adminhome'))
const AdminViewUsers = React.lazy(() => import('./components/admin/adminviewusers'))
const AdminViewDoctors = React.lazy(() => import('./components/admin/adminviewdoctors'))

const Userhome = React.lazy(() => import("./components/user/userhome"))
const UserProfile= React.lazy(() => import('./components/user/userprofile'))
const Appointment= React.lazy(() => import('./components/user/appointment'))
const GetMyPrescription= React.lazy(() => import('./components/user/getprescription'))
const SeeAllDoctors = React.lazy(() => import('./components/user/seealldoctors'))
const UserFeedback = React.lazy(() => import('./components/user/userfeedback'))

const Doctorhome = React.lazy(() => import("./components/doctor/doctorhome"))
const DoctorProfile= React.lazy(() => import('./components/doctor/doctorprofile'))
const DoctorViewAppointment = React.lazy(() => import('./components/doctor/viewappointment'))
const AddPrescription = React.lazy(() => import('./components/doctor/addprescription'))
const ViewPrescription = React.lazy(() => import('./components/doctor/viewprescription'))
const AppointmentHistory = React.lazy(() => import('./components/doctor/appointmenthistory'))
const DoctorSeeFeedback = React.lazy(() => import('./components/doctor/doctorfeedback'))


function App() {


  return (
    <>
      <Suspense fallback={<div style={{display:'flex', alignItems:'center', justifyContent:'center', height:'800px',width:'100%'}}><img src={Loadinggif} alt="Loading..." style={{}} /></div>}>
        <Routes>

          {/* COMMON PAGES */}
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/registration' element={<RegistrationPage />} />
          <Route path='/about' element={<About />} />

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
