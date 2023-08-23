import axios from "axios"



const ButtonPay = ({ cartItems }) => {

    const url = 'https://ecommerce-moez.onrender.com/'

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