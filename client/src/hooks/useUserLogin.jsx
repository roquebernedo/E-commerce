import { useDispatch } from "react-redux"

export const useUserLogin = (token) => {
    const dispatch = useDispatch()

    const userLogin = async (token) => {
        console.log("estoy en user logincito")
        try{
            
        } catch(error){
            console.error("useUserLogin", error)
        }
    }
}