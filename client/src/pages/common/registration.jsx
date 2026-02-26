import React, { useState } from 'react';
import { Tab, Tabs, Form, Button, FloatingLabel, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AXIOS from 'axios';
import HomeNavbar from '../../components/layouts/homenavbar';
import Footer from '../../components/layouts/footer';
import { toast } from 'react-toastify';
import { SPECIALIZATIONS } from '../../components/constants/specializations';

export default function CombinedRegistration() {
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'patient',
  });

  const [tab, setTab] = useState('patient')

  const handleTabChange = key => {
    setTab(key)
    if (key === 'patient')
      setUserForm({ ...userForm, role: key })
    else
      setUserForm({
        ...userForm,
        role: key,
        address: '',
        license: '',
        qualification: '',
        specialization: ''
      })
  }

  const [doctorImage, setDoctorImage] = useState(null);
  const navigate = useNavigate();

  const handleUserChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AXIOS.post(`${import.meta.env.VITE_HOST_URL}/api/user/registration`, userForm)
      if (response.status === 200) {
        toast.success(response.data.msg);
        setUserForm({ name: '', email: '', password: '' });
        setTimeout(() => navigate('/login'), 2000);
      } else {
        toast.error(response.data.msg)
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong...");
    }
  };

  const handleImageChange = (e) => {
    setDoctorImage(e.target.files[0]);
  };

  const handleDoctorSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', userForm.name)
      formData.append('email', userForm.email)
      formData.append('password', userForm.password)
      formData.append('address', userForm.address)
      formData.append('license', userForm.license)
      formData.append('qualification', userForm.qualification)
      formData.append('specialization', userForm.specialization)
      formData.append('profileImage', doctorImage)

      const res = await AXIOS.post(`${import.meta.env.VITE_HOST_URL}/api/user/registration`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } })

      if (res.status == 200) {
        toast.success(res.data.msg);
        setUserForm({ name: '', email: '', password: '', address: '', license: '', qualification: '', specialization: '' });
        setDoctorImage(null);
        setTimeout(() => { navigate('/login'); }, 2000);
      } else {
        toast.error(res.data.msg)
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong...");
    }
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

          <Tabs defaultActiveKey={tab} activeKey={tab} onSelect={handleTabChange} id="registration-tabs" className="mb-4 tabs-nav" justify>
            <Tab eventKey="patient" title="User">
              <Form onSubmit={handleUserSubmit}>
                <FloatingLabel controlId="floatingUserName" label="Your Name" className="mb-3">
                  <Form.Control type="text" name="name" value={userForm.name} onChange={handleUserChange} placeholder="Enter your name" required />
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
                  <Form.Control type="text" name="name" onChange={handleUserChange} placeholder="Enter name" required />
                </FloatingLabel>

                <FloatingLabel controlId="floatingDocEmail" label="Email address" className="mb-3">
                  <Form.Control type="email" name="email" onChange={handleUserChange} placeholder="Enter email" required />
                  <Form.Text className="text-muted">We'll never share your email.</Form.Text>
                </FloatingLabel>

                <FloatingLabel controlId="floatingDocPassword" label="Password" className="mb-3">
                  <Form.Control type="password" name="password" onChange={handleUserChange} placeholder="Password" required />
                </FloatingLabel>

                <FloatingLabel controlId="floatingLicense" label="Medical License Number" className="mb-3">
                  <Form.Control type="text" name="license" onChange={handleUserChange} placeholder="Enter License Number" required />
                </FloatingLabel>

                <FloatingLabel controlId="floatingQualification" label="Qualification" className="mb-3">
                  <Form.Control type="text" name="qualification" onChange={handleUserChange} placeholder="Qualification" required />
                </FloatingLabel>

                <FloatingLabel controlId="floatingSpecialization" label="Specialization" className="mb-3">
                  <Form.Select name="specialization" onChange={handleUserChange} required>
                    <option value="">-- Select Specialization --</option>
                    {SPECIALIZATIONS.map((specialization) =>
                      <option value={specialization}>{specialization}</option>
                    )}

                  </Form.Select>
                </FloatingLabel>

                <FloatingLabel controlId="floatingDocAddress" label="Address" className="mb-3">
                  <Form.Control as="textarea" name="address" onChange={handleUserChange} style={{ height: '100px' }} placeholder="Enter address" required />
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
