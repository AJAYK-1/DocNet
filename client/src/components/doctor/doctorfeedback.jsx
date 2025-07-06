import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Container, Card, Form, Button, FloatingLabel, Modal } from 'react-bootstrap';
import { FaComment, FaStar, FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Footer from '../footer';
import DoctorNavbar from './doctornavbar';
import './doctorStyle.css'


export default function DoctorSeeFeedback() {

  const [Feedback, setFeedback] = useState('')

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_HOST_URL}/api/user/seefeedbacks`)
      .then((res) => {
        console.log(res.data)
        setFeedback(res.data)
      }).catch((err) => {
        console.log(err)
      })
  }, [])
  

  return (
    <>
      <DoctorNavbar />
      <div className="see-all-container">
        <h1 className='see-all-heading'>💭this is what different users said</h1>
        <div className="all-feedbacks">
          {Feedback.length === 0 ? (
            <p>No Feedbacks yet...</p>
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

      </div>
      <Footer />
    </>
  );
}
