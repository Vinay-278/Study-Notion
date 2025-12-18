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
            return true;
        }
        catch(error){
            console.log("SENDOTP API ERROR ........", error)
            toast.error("could not send otp")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function signUp(accountType,firstname,lastname,email,password,confirmPassword,otp,navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...")
        try{
            const  response = await apiConnector("POST",SIGNUP_API,{
                accountType,
                firstname,
                lastname,
                email,
                password,
                confirmPassword,
                otp,
            })
            console.log("SIGNUP API RESPONSE.........",response)
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Signup Successful")
            navigate("/login")
        }
        catch(error){

            console.log("SIGNUP API ERROR ..........",error)
            toast.error("Signup Failed")
            navigate("/signup")
            console.log(error.message)
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}