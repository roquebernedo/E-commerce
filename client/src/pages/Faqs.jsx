import React, { useState } from 'react'
import '../styles/Faqs.scss'
import { FaReact } from "react-icons/fa";
import { SiRedux, SiExpress, SiMongodb, SiAuth0 } from "react-icons/si";
import { FaNodeJs } from "react-icons/fa";

const Dirstore = () => {
    return (
        <div className='dirstore'>
            <span>Dirstore</span> es un proyecto individual que tiene como objetivo crear un ecommerce ficticio 
            completamente funcional. Nuestra tienda tiene de base videojuegos, como tambien otros productos
             importantes en la industria tecnologica
        </div>
    )
}

const Ourservices = () => {
    return (
        <div className='main-services'>
            <div className='services'>
                <div className='top-services'>
                    Se puede crear una cuenta con tu email, como tambien las siguientes caracteristicas
                     las cuales estaran acontinuacion: 
                </div>
                <div className='bottom-services'>
                    <div className='main-features'>
                        <ul className='features'>
                            <li>Pasarela de pago de <span>Stripe</span>.</li>
                            <li><span>Creacion de cuentas</span>: Puedes crear una cuenta con un email. Nos limitaremos a usar la direccion de email como prueba.</li>
                            <li>Busqueda basada en las <span>categorias</span> principales. Estas muestran una combinacion entre productos propios y productos de Mercadolibre.</li>
                            <li><span>Publicaciones</span>: Los usuarios registrados tiene la opcion de crear publicaciones para vender productos. Estos tambien apareceran en las busquedas junto a los demas productos.</li>
                            <li>Esta en desarrollo las <span>Notificaciones</span> que recibiras cada vez que hagas una accion con tu cuenta. Como tambien <span>Reseñas</span> que podras hacer sobre los productos. Como tambien poder ver tu <span>Perfil</span> y editar tu cuenta.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Development = () => {
    return (
        <div className='development-section'>
            <div className='development'>
                Para el Frontend y todo lo demas relacionado con el diseño usamos <span>React</span>, 
                <span> Redux</span> y un poco de laminas de <span>codigo</span>.
            </div>
            <div className='development'>
                Para el Backend y todo lo que no ves usamos <span>Node.js</span>, <span>Express</span>, 
                <span> MongoDB</span>, <span>Auth</span> y muchas <span>neuronas...</span>
            </div>
            <div className='materials-main'>
                <div className='materials'>
                    <div className='faq-icons'><FaReact /></div>
                    <div className='faq-icons'><SiRedux /></div>
                    <div className='faq-icons'><FaNodeJs /></div>
                    <div className='faq-icons'><SiExpress /></div>
                    <div className='faq-icons'><SiMongodb /></div>
                    <div className='faq-icons'><SiAuth0 /></div>
                </div>
            </div>
        </div>
    )
}

const Me = () => {
    return (
        <div className='me'>Yo, <span>Roque Bernedo.</span></div>
    )
}

const Payment = () => {
    return (
        <div className='payment-section'>
            <div className='payment-top'>
                <div>
                    Todas las transacciones en Dirstore estan en <span>modo prueba</span>, se simula el pago 
                    en Stripe. Para esto, es necesario introducir los datos correspondientes en la pasarela
                    de pagos que desees utilizar.
                </div>
            </div>
            <div className='payment-bottom'>
                <div>Stripe:</div>
                <ul className='stripe'>
                    <li>Numero de tarjeta: 4242 4242 4242 4242</li>
                    <li>Fecha de expiracion: Cualquier fecha mayor a la actual</li>
                    <li>CVV: 123</li>
                    <li>E-mail: Cualquiera</li>
                    <li>Nombre: Cualquiera</li>
                </ul>
            </div>
        </div>
    )
}

const data = [
    {
        title: '¿Qué es Dirstore?',
        provide: <Dirstore />
    },
    {
        title: '¿Qué ofrece?',
        provide: <Ourservices />
    },
    {
        title: '¿Cómo se desarrolló?',
        provide: <Development /> 
    },
    {
        title: '¿Quién lo desarrolló',
        provide: <Me />
    },
    {
        title: '¿Cómo realizo un pago',
        provide: <Payment />
    },
]

const Faqs = () => {
    const [selected, setSelected] = useState(null)
    
    const toggle = (i) => {
        if(selected === i){
            return setSelected(null)
        }
        setSelected(i)
    }

  return (
    <div className='container-faqs'>
       <div className='accordion'>
            {data.map((item, i) => (
                <div key={i} className='item-container'>
                    <div className='title-div' onClick={() => toggle(i)}>
                        <h2>{item.title}</h2>
                        <span>{selected === i ? '-' : '+'}</span>
                    </div>
                    <div className={selected === i ? 'content-show' : 'content'}>{item.provide}</div>
                </div>
            ))}
       </div>
    </div>
  )
}

export default Faqs


