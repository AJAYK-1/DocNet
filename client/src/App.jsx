import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Registration from './components/registration'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/login'
import Adminhome from './components/admin/adminhome'
import Userhome from "./components/user/userhome";
import Doctorhome from "./components/doctor/doctorhome"
import AdminViewUsers from './components/admin/adminviewusers'
import DoctorRegistration from './components/doctor/doctorreg'
import Home from './components/home'
import UserProfile from './components/user/userprofile'
import Appointment from './components/user/appointment'
import DoctorViewAppointment from './components/doctor/viewappointment'
import AddPrescription from './components/doctor/addprescription'
import ViewPrescription from './components/doctor/viewprescription'
import GetMyPrescription from './components/user/getprescription'
import DoctorProfile from './components/doctor/doctorprofile'
import AdminViewDoctors from './components/admin/adminviewdoctors'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* COMMON PAGES */}
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />

          {/* ADMIN PAGES */}
          <Route path='/adminhome' element={<Adminhome />} />
          <Route path='/adminviewusers' element={<AdminViewUsers />} />
          <Route path='/adminviewdoctors' element={<AdminViewDoctors/>}/>

          {/* USER PAGES */}
          <Route path='/userhome' element={<Userhome />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/userprofile' element={<UserProfile />} />
          <Route path='/appointment/:id' element={<Appointment />} />
          <Route path='/getprescription' element={<GetMyPrescription/>} />

          {/* DOCTOR PAGES */}
          <Route path='/doctorhome' element={<Doctorhome />} />
          <Route path='/doctorreg' element={<DoctorRegistration />} />
          <Route path='/doctorprofile' element={<DoctorProfile/>}/>
          <Route path='/viewappointment' element={<DoctorViewAppointment />} />
          <Route path='/addprescription/:id' element={<AddPrescription />} />
          <Route path='/viewprescription' element={<ViewPrescription/>} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
