import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar, FaUser } from 'react-icons/fa';
import Footer from '../footer';
import DoctorNavbar from './doctornavbar';
import './doctorStyle.css'


export default function DoctorSeeFeedback() {

  const [Feedback, setFeedback] = useState('')

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_HOST_URL}/api/user/seefeedbacks`)
      .then((res) => {
        setFeedback(res.data.data)
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
            <p className="text-center mt-5 fs-5 text-muted">No Feedbacks yet...</p>
          ) : (
            <>
              <div className="feedback-card-container">

                {Feedback.map((feed) => (
                  <div key={feed._id} className="feedback-card">
                    <h5 className="user-name flex gap-1"> <FaUser className='user-icon' /> {feed.userId.username} says...</h5>
                    <p className="feedback-text"> {feed.feedback}</p>
                    <div className="rating-stars flex">
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
