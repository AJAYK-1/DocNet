import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Registration from './components/registration'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/login'
import Adminhome from './components/admin/adminhome'
import Userhome from "./components/user/userhome";
import Doctorhome from "./components/doctor/doctorhome"
import AdminViewUsers from './components/admin/adminviewusers'
import Home from './components/home'
import UserProfile from './components/user/userprofile'
import Appointment from './components/user/appointment'
import DoctorViewAppointment from './components/doctor/viewappointment'
import AddPrescription from './components/doctor/addprescription'
import ViewPrescription from './components/doctor/viewprescription'
import GetMyPrescription from './components/user/getprescription'
import DoctorProfile from './components/doctor/doctorprofile'
import AdminViewDoctors from './components/admin/adminviewdoctors'
import About from './components/about';
import AppointmentHistory from './components/doctor/appointmenthistory';
import UserFeedback from './components/user/userfeedback';
import SeeAllDoctors from './components/user/seealldoctors';
import DoctorSeeFeedback from './components/doctor/doctorfeedback';


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* COMMON PAGES */}
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />

          {/* ADMIN PAGES */}
          <Route path='/adminhome' element={<Adminhome />} />
          <Route path='/adminviewusers' element={<AdminViewUsers />} />
          <Route path='/adminviewdoctors' element={<AdminViewDoctors />} />

          {/* USER PAGES */}
          <Route path='/userhome' element={<Userhome />} />
          <Route path='/registration' element={<Registration />} />
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
      </BrowserRouter>
      <ToastContainer position="top-center" newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable autoClose={1000} />
    </>
  )
}

export default App
