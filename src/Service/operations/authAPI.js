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
            navigate("/verify-email");
            dispatch(setLoading(false));
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
                otp
            })
            console.log("SIGNUP API RESPONSE.........",response)
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Signup Successful")
            navigate("/login")
        }
        catch(error){
            
            console.log(error.response?.data);
            console.log("SIGNUP API ERROR ..........",error)
            toast.error("Signup Failed")
            navigate("/signup")
            console.log(error.message)
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function login(email, password, naviagte){
    return async (dispatch) =>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST", LOGIN_API,{
                email,
                password,
            });
            console.log("Login api response .....", response)
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("login successful")
            dispatch(setToken(response.data.token))
            const userImage = response.data?.user?.image
              ? response.data.user.image
              : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;
              localStorage.setItem("token", JSON.stringify(response.data.token))
              localStorage.setItem("user",JSON.stringify(response.data.user))
        }
        catch(error){
            console.log("Login api error ....", error)
            toast.error("login failed")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    } 
}

export function logout(navigate){
    return (dispatch) =>{
        dispatch(setToken(null))
        dispatch(setUser(null))
        dispatch(resetCart)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("logged out")
        navigate("/")
    }
}