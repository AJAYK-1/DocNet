import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Container, Card, Form, Button, FloatingLabel, Modal } from 'react-bootstrap';
import { FaComment, FaStar, FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import UserNavbar from './usernavbar';
import Footer from '../footer';
import './userStyling.css'


export default function UserFeedback() {
  const decoded = useMemo(() => {
    const token = localStorage.getItem('token');
    return jwtDecode(token);
  }, [])

  const [Feedback, setFeedback] = useState('')

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_HOST_URL}/api/user/seefeedbacks`)
      .then((res) => {
        setFeedback(res.data.data)
      }).catch((err) => {
        console.log(err)
      })
  }, [])

  const [show, setShow] = useState(false)
  const handleShow = () => { setShow(true) }
  const handleClose = () => { setShow(false) }
  const [starRating, setstarRating] = useState(null)
  const [Hover, setHover] = useState(null)
  const [Writefeed, setWritefeed] = useState({
    feedback: '',
    rating: ''
  })

  const handleChange = (e) => {
    setWritefeed({ ...Writefeed, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    Writefeed.rating = starRating
    handleClose()
    axios.post(`${import.meta.env.VITE_HOST_URL}/api/user/write-feedback`, {
      userId: decoded.id,
      ...Writefeed
    })
      .then((res) => {
        if (res.data.status == 200) {
          toast.success(res.data.msg)

        } else {
          toast.error(res.data.msg)
        }
      }).catch((err) => {
        toast.error(err)
      })
  }

  return (
    <>
      <UserNavbar />
      <div className="see-all-container">
        <h1 className='see-all-heading'>💭What other users said</h1>
        <div className="all-feedbacks">
          {Feedback.length === 0 ? (
            <p className="text-center mt-5 fs-5 text-muted">No Feedbacks yet...</p>
          ) : (
            <>
              <div className="feedback-card-container">

                {Feedback.map((feed) => (
                  <div key={feed._id} className="feedback-card">
                    <h5 className="user-name"> <FaUser className='user-icon' /> {feed.userId.username} says...</h5>
                    <p className="feedback-text"> {feed.feedback}</p>
                    <div className="rating-stars">
                      {[...Array(5)].map((_, index) => (
                        <FaStar
                          className='star-rating'
                          key={index}
                          color={index < feed.rating ? "#f39c12" : "#dcdcdc"}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <div className='click-to-add-feedback' onClick={handleShow}>
          <FaComment />
        </div>
        <Modal show={show} onHide={handleClose}>
          <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>💬 Write your feedback</Modal.Title>
            </Modal.Header>

            <Modal.Body className="write-your-feedback">
              <FloatingLabel label='Write your feedback'>
                <Form.Control
                  as='textarea'
                  className='feedback-column mb-4'
                  name='feedback'
                  onChange={handleChange}
                  style={{ height: '100px' }}
                  required
                />
              </FloatingLabel>

              <Form.Label className='mb-2'>Your Rating:</Form.Label>
              <div>
                {[...Array(5)].map((_, i) => {
                  const starNumber = i + 1;
                  return (
                    <span key={i}>
                      <input
                        type="radio"
                        className='input-star'
                        name='rating'
                        value={starNumber}
                      />
                      <FaStar
                        className='star-rating'
                        onClick={() => setstarRating(starNumber)}
                        onMouseEnter={() => setHover(starNumber)}
                        onMouseLeave={() => setHover(null)}
                        color={starNumber <= (Hover || starRating) ? "#ffc107" : "rgb(198, 199, 199)"}
                      />
                    </span>
                  );
                })}
              </div>
            </Modal.Body>


            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>Close</Button>
              <Button variant="primary" type='submit'>Submit</Button>
            </Modal.Footer>
          </Form>
        </Modal>

      </div>
      <Footer />
    </>
  );
}
