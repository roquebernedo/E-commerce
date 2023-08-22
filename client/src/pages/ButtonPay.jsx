import axios from "axios"
import { useSelector } from "react-redux"


const ButtonPay = ({ cartItems }) => {

    const url = 'http://localhost:8000'

    const handlecheckout = () => {
        axios.post(`${url}/api/stripe/create-checkout-session`, {
            cartItems
        }).then((res) => {
            if(res.data.url){
                window.location.href = res.data.url
            }
        }).catch((err) => console.log(err.message))
    }

    return ( 
        <>
            <button onClick={() => handlecheckout()}>Check Out</button>
        </>
    );
}
   
export default ButtonPay;