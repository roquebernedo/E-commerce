import React from 'react'
import './Footer.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const Footer = () => {

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      toast('Es Broma! XD')
    }
  };

  return (
    <div className='footer' id='footer'>
        <div className='box-footer'>
            <div className='left'>
                <h2 className='name-footer'>About us</h2>
                <p className='text'>
                  Somos un E-comemrce enfocados en la venta de productos tecnologicos, aunque nuestra especializacion son los videojuegos.
                  Es decir, somos gamers.
                </p>
            </div>
            <section className='middle'>
              <div className='middle-subscribe'>
                <label className='label-subscribe' >Suscribete <input onKeyDown={handleKeyDown} className='input-subscribe' /></label>
                <ToastContainer /> {/* Modificado */}
              </div>
            </section>
            <div className='right'>
                <Link to='/us' className='option'>Contacto</Link>
                <Link to='/us' className='option'>Quienes Somos?</Link>
                <Link to='/questions' className='option'>Preguntas Frecuentes</Link>
            </div>
        </div>
    </div>
  )
}

export default Footer