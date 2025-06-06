import React, { useState } from 'react';
import { Tab, Tabs, Form, Button, FloatingLabel, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AXIOS from 'axios';
import HomeNavbar from './homenavbar';
import Footer from './footer';

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
    address: ''
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
        alert(res.data.msg);
        setUserForm({ username: '', email: '', password: '' });
        navigate('/login');
      }).catch((err) => {
        console.log(err);
        alert("User Registration Error");
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
    formData.append('docname', doctorForm.docname);
    formData.append('email', doctorForm.email);
    formData.append('password', doctorForm.password);
    formData.append('address', doctorForm.address);
    formData.append('profileImage', doctorImage);

    AXIOS.post("http://localhost:9000/api/doctor/doctorregistration", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then((res) => {
        alert("Doctor Registered Successfully");
        setDoctorForm({ docname: '', email: '', password: '', address: '' });
        setDoctorImage(null);
        navigate('/login');
      }).catch((err) => {
        console.log(err);
        alert("Doctor Registration Error");
      });
  };

  return (
    <>
      <HomeNavbar />
      <Container className="mt-5" style={{ alignContent: 'center', width: '500px',padding:'30px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
        <h2
          className="text-center mb-4 fw-bold text-dark border-bottom pb-2"
          style={{
            fontFamily: "'Shadows Into Light', cursive",
            fontSize: '2rem',
            letterSpacing: '1px',
            textShadow: '10px 5px 1px rgba(0,0,0,0.1)'
          }}
        >
          Register
        </h2>
        <Tabs defaultActiveKey="user" id="registration-tabs" className="mb-4" justify>

          <Tab eventKey="user" title="User">
            <Form onSubmit={handleUserSubmit}>

              <FloatingLabel controlId="floatingUserName" label="Your Name" className="mb-3">
                <Form.Control type="text" name="username" value={userForm.username} onChange={handleUserChange} placeholder="Enter your name" />
              </FloatingLabel>

              <FloatingLabel controlId="floatingEmail" label="Email" className="mb-3">
                <Form.Control type="email" name="email" value={userForm.email} onChange={handleUserChange} placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </FloatingLabel>


              <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                <Form.Control type="password" name="password" value={userForm.password} onChange={handleUserChange} placeholder="Password" />
              </FloatingLabel>

              <Form.Group className="mb-3">
                <Form.Check
                  required
                  label="Agree to terms and conditions"
                  feedback="You must agree before submitting."
                  feedbackType="invalid"
                />
              </Form.Group>

              <Button type="submit" className='w-100 mt-4'>Sign Up</Button>
              <p className="text-center mt-3">Already registered? <a href="/login">Sign in here</a></p>
            </Form>
          </Tab>


          <Tab eventKey="doctor" title="Doctor">
            <Form onSubmit={handleDoctorSubmit}>

              <FloatingLabel controlId="floatingDocName" label="Doctor Name" className="mb-3">
                <Form.Control type="text" name="docname" value={doctorForm.docname} onChange={handleDoctorChange} placeholder="Enter name" />
              </FloatingLabel>

              <FloatingLabel controlId="floatingDocEmail" label="Email address" className="mb-3">
                <Form.Control type="email" name="email" value={doctorForm.email} onChange={handleDoctorChange} placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </FloatingLabel>

              <FloatingLabel controlId="floatingDocPassword" label="Password" className="mb-3">
                <Form.Control type="password" name="password" value={doctorForm.password} onChange={handleDoctorChange} placeholder="Password" />
              </FloatingLabel>

              <FloatingLabel controlId="floatingDocAddress" label="Address" className="mb-3">
                <Form.Control as="textarea" name="address" value={doctorForm.address} onChange={handleDoctorChange} style={{ height: '100px' }} placeholder="Enter address" />
              </FloatingLabel>

              <Form.Group className="mb-3">
                <Form.Label>Upload Profile Image</Form.Label>
                <Form.Control type="file" onChange={handleImageChange} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  required
                  label="Agree to terms and conditions"
                  feedback="You must agree before submitting."
                  feedbackType="invalid"
                />
              </Form.Group>

              <Button type="submit" className='w-100 mt-4'>Sign Up</Button>
              <p className="mt-3 text-center">Already registered? <a href="/login">Sign in here</a></p>
            </Form>
          </Tab>
        </Tabs>
      </Container>
      <Footer />
    </>
  );
}
