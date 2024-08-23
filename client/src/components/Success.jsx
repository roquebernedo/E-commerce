import React from 'react'
import { useDispatch } from 'react-redux'
import { cleanCart } from '../slices/authSlice'
import '../styles/Success.scss'
//import { useNavigate } from 'react-router-dom'

const Success = () => {
  //const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  //const { userInfo } = useSelector((state) => state.auth);
  //const navigate = useNavigate();

//   useEffect(() => {
//     const update = async () => {
//         console.log("entro al update de success")
//         await dispatch(cancelando())
//         setLoading(false);
//     };
//     update();
//     console.log("bota tu gaaa")

//     const timer = setTimeout(() => {
//     console.log("estamos en el settimout")
//       navigate('/');
//     }, 5000);

//     return () => clearTimeout(timer);
// }, [dispatch, navigate]);

const update = () => {
  console.log("entro al update de success")
  dispatch(cleanCart())
  console.log("ojala entre ctmre")
  //setLoading(false);
};
  return (
    <div className='mainSuccess'>
      {/* {loading ? (
        <div className="loading">Procesando su pedido, por favor espere...</div>
      ) : (
        <div className='gracias'>¡Gracias por su compra!</div>
      )} */}
      <button onClick={() => update()}>gaaaa</button>
    </div>
  );
}

export default Success