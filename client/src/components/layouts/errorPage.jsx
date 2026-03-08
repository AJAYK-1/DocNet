import React from 'react'
import Lottie from 'lottie-react'
import ErrorPage from '../../assets/ErrorPage.json'

const Errorpage = () => {
    return (
        <Lottie animationData={ErrorPage} style={{ height: '800px' }} />
    )
}

export default Errorpage