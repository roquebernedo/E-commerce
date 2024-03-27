import React from 'react'
import { Link } from 'react-router-dom'

const RegisterInfo = ({ setEmail, setPassword, setName, setConfirmPassword, submitHandler }) => {
    return(
        <form className='form-reg' onSubmit={submitHandler}>
            <section className='login-container'> 
            <div className='login-title'>
                <h1 className='title'>Sign up</h1>
            </div>
            <div className='login-email'>
                <label className='email'>Nombre</label>
                <input type='text' className='email-input' onChange={(e) => setName(e.target.value)} />
            </div>
            <div className='login-email'>
                <label className='email'>Email</label>
                <input type='text' className='email-input' onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='login-password'>
                <label className='password'>Contraseña</label>
                <input type='password' className='password-input' onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className='login-password'>
                <label className='password'>Repetir contraseña</label>
                <input type='password' className='password-input' onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <div className='login-button'>
                <button className='log-in' type='submit'>Registrarme</button>
            </div>
            <div className='login-recover'>
                <Link className='login-create' to='/login'>regresar</Link>
            </div>
            </section>
        </form>
    )
}

export default RegisterInfo