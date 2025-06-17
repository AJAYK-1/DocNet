import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Container, Card, Form, Button, FloatingLabel } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify';
import UserNavbar from './usernavbar';
import Footer from '../footer';
import { data } from 'react-router-dom';

export default function UserFeedback() {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);

  const [Feedback, setFeedback] = useState('')

  useEffect(() => {
    axios.get('http://localhost:9000/api/user/seefeedbacks')
      .then((res) => {
        console.log(res.data)
        setFeedback(res.data)
      }).catch((err) => {
        console.log(err)
      })
  }, [])

  const [Writefeed, setWritefeed] = useState({
    feedback: '',
    rating: ''
  })

  const handleChange = (e) => {
    setWritefeed({ ...Writefeed, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:9000/api/user/write-feedback',{
      userId: decoded.id,
      ...Writefeed
    })
    .then((res) => {
      console.log(res.data)
      if(res.data.status == 200) {
      toast.success(res.data.msg)

      }else{
        toast.error(res.data.msg)
      }
    }).catch((err) => {
      console.log(err)
      toast.error(err)
    })
  }

  return (
    <>
      <UserNavbar />
      <div className="see-all-container">
        <div className="write-your-feedback">
          <Form onSubmit={handleSubmit}>
            <FloatingLabel label='Write your feedback'>
              <Form.Control type='textarea' name='feedback' onChange={handleChange} required />
            </FloatingLabel>
            <FloatingLabel label='Rating'>
              <Form.Control type='number' name='rating' onChange={handleChange} required />
            </FloatingLabel>
            <Button type='submit'>Submit</Button>
          </Form>
        </div>
        <div className="all-feedbacks">
          {Feedback.length == 0 ? (
            <p>No Feedbacks yet...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>User:</th>
                  <th>Feedback</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {Feedback.map((feed) => (
                  <tr key={feed._id}>
                    <td>{feed.userId.username}</td>
                    <td>{feed.feedback}</td>
                    <td>{feed.rating}</td>
                  </tr>
                ))}

              </tbody>
            </table>
          )}

        </div>

      </div>
      <Footer />
    </>
  );
}
