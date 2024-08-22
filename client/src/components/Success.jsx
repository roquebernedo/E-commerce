import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updatingCart } from '../slices/authSlice'
import '../styles/Success.scss'
import { useNavigate } from 'react-router-dom'

const Success = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  //const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const update = async () => {
        try {
            console.log("entro al update de success")
            await dispatch(updatingCart());
            setLoading(false);
        } catch (error) {
            console.log("entro al error")
            console.error(error);
            // Manejo de errores
        }
    };
    update();

    const timer = setTimeout(() => {
    console.log("estamos en el settimout")
      navigate('/');
    }, 5000);

    return () => clearTimeout(timer);
}, [dispatch, navigate]);

  return (
    <div className='mainSuccess'>
      {loading ? (
        <div className="loading">Procesando su pedido, por favor espere...</div>
      ) : (
        <div className='gracias'>¡Gracias por su compra!</div>
      )}
    </div>
  );
}

export default Success