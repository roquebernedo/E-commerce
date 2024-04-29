import axios from "axios"
import { Link } from "react-router-dom"

const ButtonPay = ({ cartItems }) => {

    const url = 'https://e-commerce-f1fr.onrender.com'
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
            <Link className="button-check common-button-styles" onClick={() => handlecheckout()}>PROCEED TO CHECK</Link>
        </>
    );
}
   
export default ButtonPay;