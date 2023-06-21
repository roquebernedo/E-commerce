import React from 'react'
import './Footer.scss'

const Footer = () => {
  return (
    <div className='footer'>
        <div className='box-footer'>
            <div className='left'>
                <h2 className='name-footer'>Dirsley</h2>
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