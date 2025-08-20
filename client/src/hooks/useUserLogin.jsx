import axios from "axios";
import { useDispatch } from "react-redux"
import { setCredentials } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export const useUserLogin = (token) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const userLogin = async (token) => {
    //     console.log("estoy en user logincito")
    //     try{
            
    //     } catch(error){
    //         console.error("useUserLogin", error)
    //     }
    // }

    const googleLogin = async (token, userData) => {
        const {
          sub,
          email,
          email_verified: emailVerified,
          //picture: avatar,
          given_name: firstName,
          family_name: lastName,
        } = userData;
        console.log(sub)
        console.log(emailVerified)
        console.log("este es el email")
        console.log("token: ", token)
        console.log(email)
        try {
          const { data } = await axios.post(`http://localhost:8000/api/users/signinGoogle`, {
            sub,
            email,
            emailVerified,
            //avatar,
            firstName,
            lastName,
          });
          console.log("aca va el data")
          console.log(data)
          console.log(email)
          console.log(data.error)
          console.log(emailVerified)
          //console.log (avatar)
          if (data.error) {
            window.localStorage.removeItem("loggedTokenEcommerce");
            //return notification(data.message, "", "error");
          } else if (data) {
            window.localStorage.setItem("loggedTokenEcommerce", data.token);
            console.log("user logito")
            dispatch(setCredentials(data))
            navigate('/')
            toast.success('Logeado exitosamente!')
            //userLogin(token);
          }
          // else
        } catch (error) {
          console.error("useUserLogin google: catch " + error);
          if (error?.response?.data) {
            //notification(error.response.data, "", "error");
          } else if (error.message) {
            //notification(error.message, "", "warning");
          } else {
            //notification("El servidor está fuera de línea", "", "warning");
          }
        } finally {
            console.log("jeje")
          //dispatch(loadingUserData(false));
        }
    };

    return {
        googleLogin
    }
    
}