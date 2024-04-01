import React, { useState } from 'react'
import '../styles/Faqs.scss'

const data = [
    {
        title: '¿Qué es Dirstore?',
        provide: 'Dirstore es un proyecto individual que tiene como objetivo el de crear un ecommerce fecticio completamente funcional.Nuestra tienda tiene de base videojuegos, como tambien otros productos importantes en la industria tecnologica'
    },
    {
        title: '¿Qué ofrece?',
        provide: 'Se puede crear una cuenta con tu email, como tambien las siguientes caracteristicas las cuales estaran acontinuacion: '
    },
    {
        title: '¿Cómo se desarrolló?',
        provide: 'Para el Frontend y todo lo demas relacionado con el diseño usamos React, Redux y un poco de laminas de codigoo. Para el Backend y todo lo que no ves usamos Node.js, Express, MondoDB, Auth y muchas neuronas...' 
    },
    {
        title: '¿Quién lo desarrolló',
        provide: 'Yo, Roque Bernedo.'
    },
    {
        title: '¿Cómo realizo un pago',
        provide: 'Recien lo estoy configurando, bueno en si ya lo tengo pero esta en modo prueba xD'
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

