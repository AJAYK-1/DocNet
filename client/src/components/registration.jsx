import React, { useState } from 'react';
import { Tab, Tabs, Form, Button, FloatingLabel, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AXIOS from 'axios';
import HomeNavbar from './homenavbar';
import Footer from './footer';
import { toast } from 'react-toastify';
import './App.css'


export default function CombinedRegistration() {
  const [userForm, setUserForm] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [doctorForm, setDoctorForm] = useState({
    docname: '',
    email: '',
    password: '',
    address: '',
    license: '',
    qualification: '',
    specialization: ''
  });

  const [doctorImage, setDoctorImage] = useState(null);
  const navigate = useNavigate();


  const handleUserChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    AXIOS.post("http://localhost:9000/api/user/registeruser", userForm)
      .then((res) => {
        if (res.data.status == 200) {
          toast.success(res.data.msg);
          setUserForm({ username: '', email: '', password: '' });
          setTimeout(() => navigate('/login'), 2000);
        } else if (res.data.status == 400) {
          toast.error(res.data.msg)
        }
      }).catch((err) => {
        console.log(err);
        toast.error(res.data.msg);
      });
  };


  const handleDoctorChange = (e) => {
    setDoctorForm({ ...doctorForm, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setDoctorImage(e.target.files[0]);
  };

  const handleDoctorSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('docname', doctorForm.docname)
    formData.append('email', doctorForm.email)
    formData.append('password', doctorForm.password)
    formData.append('address', doctorForm.address)
    formData.append('license', doctorForm.license)
    formData.append('qualification', doctorForm.qualification)
    formData.append('specialization', doctorForm.specialization)
    formData.append('profileImage', doctorImage)

    AXIOS.post("http://localhost:9000/api/doctor/doctorregistration", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then((res) => {
        if (res.data.status == 200) {
          toast.success("Doctor Registered Successfully");
          setDoctorForm({ docname: '', email: '', password: '', address: '', license: '', qualification: '', specialization: '' });
          setDoctorImage(null);
          navigate('/login');
        } else if (res.data.status == 400) {
          toast.error(res.data.msg)
        }
      }).catch((err) => {
        console.log(err);
        toast.error(res.data.msg);
      });
  };

  return (
    <>
      <HomeNavbar />
      <div className="registration-page">
        <div className="login-overlay" />
        <Container className="registration-card">
          
          <h2 className="text-center mb-4 fw-bold text-dark border-bottom pb-2"
            style={{ fontFamily: "'Shadows Into Light', cursive", fontSize: '2rem', letterSpacing: '1px' }}>
            Register
          </h2>

          <Tabs defaultActiveKey="user" id="registration-tabs" className="mb-4 tabs-nav" justify>
            <Tab eventKey="user" title="User">
              <Form onSubmit={handleUserSubmit}>
                <FloatingLabel controlId="floatingUserName" label="Your Name" className="mb-3">
                  <Form.Control type="text" name="username" value={userForm.username} onChange={handleUserChange} placeholder="Enter your name" required />
                </FloatingLabel>

                <FloatingLabel controlId="floatingEmail" label="Email" className="mb-3">
                  <Form.Control type="email" name="email" value={userForm.email} onChange={handleUserChange} placeholder="Enter email" required />
                  <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                </FloatingLabel>

                <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                  <Form.Control type="password" name="password" value={userForm.password} onChange={handleUserChange} placeholder="Password" required />
                </FloatingLabel>

                <Form.Check required label="Agree to terms and conditions" className="mb-3" />
                <Button type="submit" className='w-100 mt-4'>Sign Up</Button>
                <p className="text-center mt-3">Already registered? <a href="/login">Sign in here</a></p>
              </Form>
            </Tab>

            <Tab eventKey="doctor" title="Doctor">
              <Form onSubmit={handleDoctorSubmit}>
                <FloatingLabel controlId="floatingDocName" label="Doctor Name" className="mb-3">
                  <Form.Control type="text" name="docname" onChange={handleDoctorChange} placeholder="Enter name" required />
                </FloatingLabel>

                <FloatingLabel controlId="floatingDocEmail" label="Email address" className="mb-3">
                  <Form.Control type="email" name="email" onChange={handleDoctorChange} placeholder="Enter email" required />
                  <Form.Text className="text-muted">We'll never share your email.</Form.Text>
                </FloatingLabel>

                <FloatingLabel controlId="floatingDocPassword" label="Password" className="mb-3">
                  <Form.Control type="password" name="password" onChange={handleDoctorChange} placeholder="Password" required />
                </FloatingLabel>

                <FloatingLabel controlId="floatingLicense" label="Medical License Number" className="mb-3">
                  <Form.Control type="text" name="license" onChange={handleDoctorChange} placeholder="Enter License Number" required />
                </FloatingLabel>

                <FloatingLabel controlId="floatingQualification" label="Qualification" className="mb-3">
                  <Form.Control type="text" name="qualification" onChange={handleDoctorChange} placeholder="Qualification" required />
                </FloatingLabel>

                <FloatingLabel controlId="floatingSpecialization" label="Specialization" className="mb-3">
                  <Form.Select name="specialization" onChange={handleDoctorChange} required>
                    <option value="">-- Select Specialization --</option>

                    <optgroup label=" Non-Surgical (MD/DNB)">
                      <option value="General Medicine">General Medicine</option>
                      <option value="Pediatrics">Pediatrics</option>
                      <option value="Dermatology">Dermatology</option>
                      <option value="Psychiatry">Psychiatry</option>
                      <option value="Radiology">Radiology</option>
                      <option value="Pathology">Pathology</option>
                      <option value="Anesthesiology">Anesthesiology</option>
                      <option value="Pulmonology">Pulmonology</option>
                      <option value="Cardiology">Cardiology</option>
                      <option value="Endocrinology">Endocrinology</option>
                      <option value="Neurology">Neurology</option>
                      <option value="Gastroenterology">Gastroenterology</option>
                      <option value="Nephrology">Nephrology</option>
                      <option value="Hematology">Hematology</option>
                    </optgroup>
                    <optgroup label=" Surgical (MS/MCh)">
                      <option value="General Surgery">General Surgery</option>
                      <option value="Orthopedics">Orthopedics</option>
                      <option value="ENT">ENT (Otorhinolaryngology)</option>
                      <option value="Ophthalmology">Ophthalmology</option>
                      <option value="Obstetrics & Gynecology">Obstetrics & Gynecology (OBG)</option>
                      <option value="Urology">Urology</option>
                      <option value="Neurosurgery">Neurosurgery</option>
                      <option value="Cardiothoracic Surgery">Cardiothoracic Surgery</option>
                      <option value="Plastic Surgery">Plastic Surgery</option>
                    </optgroup>
                    <optgroup label=" Alternative & Traditional Medicine">
                      <option value="Ayurveda">Ayurveda</option>
                      <option value="Homeopathy">Homeopathy</option>
                      <option value="Unani">Unani</option>
                      <option value="Naturopathy">Naturopathy</option>
                    </optgroup>
                  </Form.Select>
                </FloatingLabel>

                <FloatingLabel controlId="floatingDocAddress" label="Address" className="mb-3">
                  <Form.Control as="textarea" name="address" onChange={handleDoctorChange} style={{ height: '100px' }} placeholder="Enter address" required />
                </FloatingLabel>

                <Form.Group className="mb-3">
                  <Form.Label>Upload Profile Image</Form.Label>
                  <Form.Control type="file" onChange={handleImageChange} required />
                </Form.Group>

                <Form.Check required label="Agree to terms and conditions" className="mb-3" />
                <Button type="submit" className='w-100 mt-4'>Sign Up</Button>
                <p className="click-here mt-3 text-center"> Already registered? <a href="/login">Sign in here</a></p>
              </Form>
            </Tab>
          </Tabs>
        </Container>
      </div>
      <Footer />
    </>
  );
}
