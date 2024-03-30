import React from 'react'
import './Footer.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
                <div className='option'>Contacto</div>
                <div className='option'>Quienes Somos?</div>
                <div className='rights'>Preguntas Frecuentes</div>
            </div>
        </div>
    </div>
  )
}

export default Footer