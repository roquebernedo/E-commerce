import React from 'react'
import { Link } from 'react-router-dom'

const FormInfo = ({ setEmail, setPassword }) => {
    return(
        <div className="login">
            <section className='login-container'> 
                <div className='login-title'>
                    <h1 className='title'>Sign in</h1>
                </div>
                <div className='login-email'>
                    <label className='email'>Email o usuario</label>
                    <input type='text' className='email-input' onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='login-password'>
                    <label className='password'>Contraseña</label>
                    <input type='password' className='password-input' onChange={(e) => setPassword(e.target.value)} />
                    <div className='password-save'>Recuperar contraseña</div>
                </div>
                <div className='login-button'>
                    <button className='log-in' type='submit'>Log in</button>
                </div>
                <div className='login-recover'>
                    <div className='login-ask'>¿Necesitas una cuenta?</div>
                    <Link className='login-create' to='/register'>Crear cuenta</Link>
                </div>
            </section>
        </div>
    )
}

export default FormInfo

// import React from 'react'
// import { Link } from 'react-router-dom'

// const FormInfo = ({ classForm, title, type, value, setItem  }) => {
//     return(
//         <div className={classForm}>
//             <div>{title}</div>
//             <input
//                 type={type}
//                 value={value}
//                 onChange={(e) => setItem(e.target.value)}
//             />
//         </div>
//     )
// }

// export default FormInfo