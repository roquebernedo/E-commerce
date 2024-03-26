import React from 'react'
import '../styles/Us.scss'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Us = () => {
  return (
    <div className='container-us'>
        <section className='us-section'>
            <div className='us-title'>NOSOTROS</div>
            <div className='us-me'>
                <div className='img'>
                    <img className='img-me' src='https://cdn.dribbble.com/userupload/13382667/file/original-2a9cb0f5ad4a2a8a3a96918ac41ff61d.jpg?resize=752x' alt='' />
                </div>
                <div className='me'>
                    <div className='name'>
                        <h2 className='roque'>Roque Bernedo</h2>
                    </div>
                    <div className='git'>
                        <div className='github'>GitHub</div>
                        <FaGithub />
                    </div>
                    <div className='linkedin'>
                        <div className='link'>Linkedln</div>
                        <FaLinkedin className='lin' />
                    </div>
                    <div className='email'>
                        <div className='mail'>roquebernedo@gmail.com</div>
                        <MdEmail className='em' />
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Us