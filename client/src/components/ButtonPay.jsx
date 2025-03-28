import axios from "axios"
import { Link } from "react-router-dom"

const ButtonPay = ({ cartItems }) => {
    console.log(cartItems)
    //https://e-commerce-f1fr.onrender.com  
    //http://localhost:8000
    const url = 'https://e-commerce-f1fr.onrender.com '
    const handlecheckout = () => {
        console.log("entro al axios")
        axios.post(`${url}/api/stripe/create-checkout-session`, {
            cartItems
        }).then((res) => {
            if(res.data.url){
                console.log("entro al check")
                window.location.href = res.data.url
            }
        }).catch((err) => console.log(err.message))
        console.log("salio")
    }

    return ( 
        <>
            <Link className="button-check common-button-styles" onClick={() => handlecheckout()}>PROCEED TO CHECK</Link>
        </>
    );
}
   
export default ButtonPay;