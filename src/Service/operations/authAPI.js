import {toast} from "react-hot-toast"
import {setLoading,setToken} from '../../Slice/authSlice'
import {resetCart} from '../../Slice/cartSlice'
import {setUser} from '../../Slice/profileSlice'
import {apiConnector} from '../apiconnector'
import {endpoints} from '../apis'

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API
} =endpoints

export function sendOtp(email,navigate){
    return async(dispatch) =>{
        const toastId= toast.loading("Loading...")
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST", SENDOTP_API, {
              email,
              checkUserPresent: true,
            });
            console.log("SENDOTP API RESPONSE........",response)
            console.log(response.data.success)
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("OTP sent Successfully")
            navigate('/verify-email')
        }
        catch(error){
            console.log("SENDOTP API ERROR ........", error)
            toast.error("could not send otp")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}