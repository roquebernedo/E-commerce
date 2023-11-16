import React from 'react'
import './Footer.scss'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className='box-footer'>
            <div className='left'>
                <h2 className='name-footer'>About us</h2>
                <p className='text'>
                  We are an E-commerce site that brings forth new and innovative designs in clothing, such 
                  as polo shirts and T-shirts. Our intention is to address any doubts that arise when choosing a garment.
                </p>
            </div>
            <div className='right'>
                <div className='option'>Contact us</div>
                <div className='option'>Terms of service</div>
                <div className='rights'>© All rights reserved</div>
            </div>
        </div>
    </div>
  )
}

export default Footer