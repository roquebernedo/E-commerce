import React, { useState } from 'react'
import '../styles/Faqs.scss'
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

const Item = ({ title, provide }) => {
    const [show, setShow] = useState(false)
    
    const handleShow = () => {
        if(show){
            setShow(false)
        }else{
            setShow(true)
        }
    }

    return (
        <div className={`dirstore-main ${show ? 'expanded' : ''}`}>
            <div className='dirstore'>
                <div className={`what-is-dirs ${show ? 'what-is' : ''}`} onClick={handleShow}>
                    <div className='question-1'>{title}</div>
                    {!show ? <FaChevronDown className='updown' /> : <FaChevronUp className='updown' />}
                </div>
                { !show ? "" : 
                    <div className={`info-dirs ${show ? 'expanded-dirs' : ''}`}>
                        <div className='information'>
                            {provide}
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

const Faqs = () => {

  return (
    <div className='container-faqs'>
        <section className='faq-section'>   
            <div className='faq-title'>FAQs</div>
            <div className='faq-me'>
                <div className='me-container'>
                    <Item 
                        title={'¿Qué es Dirstore?'}
                        provide={'Dirstore es un proyecto individual que tiene como objetivo el de crear un ecommerce fecticio completamente funcional.Nuestra tienda tiene de base videojuegos, como tambien otros productos importantes en la industria tecnologica'}
                    />
                    <Item 
                        title={'¿Qué ofrece?'}
                        provide={'Se puede crear una cuenta con tu email, como tambien las siguientes caracteristicas las cuales estaran acontinuacion: '}
                    />   
                    <Item 
                        title={'¿Cómo se desarrolló?'}
                        provide={'Para el Frontend y todo lo demas relacionado con el diseño usamos React, Redux y un poco de laminas de codigoo. Para el Backend y todo lo que no ves usamos Node.js, Express, MondoDB, Auth y muchas neuronas...'}
                    /> 
                    <Item 
                        title={'¿Quién lo desarrolló'}
                        provide={'Yo, Roque Bernedo.'}
                    /> 
                    <Item 
                        title={'¿Cómo realizo un pago'}
                        provide={'Recien lo estoy configurando, bueno en si ya lo tengo pero esta en modo prueba xD'}    
                    />  
                </div>
            </div>
        </section>
    </div>
  )
}

export default Faqs