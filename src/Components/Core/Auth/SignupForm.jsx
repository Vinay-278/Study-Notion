import {useState} from "react"
import {toast} from "react-hot-toast"
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"

import {sendOtp} from '../../../Service/operations/authAPI'
import {setSignupData} from "../../../Slice/authSlice"
import {ACCOUNT_TYPE} from '../../../Util/constants'
import Tab from '../../Common/Tab'

import {FaUser,FaLock} from "react-icons/fa"
import {SiGmail} from "react-icons/si"

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //student or instructor
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)
  const [formData, setFormData] = useState({
    firstname:"",
    lastname:"",
    email:"",
    password:"",
    confirmPassword:"",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {firstname, lastname, email, password, confirmPassword} = formData;

  //Handle input fields when some value chnages
  const handleOnchange = (e) =>{
    setFormData((prevData)=>({
      ...prevData,
      [e.target.name]:e.target.value,
    }))
  }
  //Password validation function
  const isPasswordValid = (passoword) =>{
    const minLength = 8;
    const hasUpperCase =/[A-Z]/.test(passoword);
    const hasLowerCase =/[a-z]/.test(passoword);
    const hasNumber =/\d/.test(passoword);
    const hasSpecialChar =/[!@#%$^&*(){}|<>?_]/.test(passoword);
    return (
      passoword.length >= minLength &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar &&
      hasUpperCase
    );
  };
  
  //Handle form submission
  const handleOnSubmit =(e) =>{
    e.preventDefault();
    if(password !== confirmPassword){
      toast.error("Password do not match");
      return;
    }
    if(!isPasswordValid(password)){
        toast.error(
          "password must be at least 8 characters long and include uppercase, lowercase, number, and specials character"
        )
        return;
    }

    const signupData ={
      ...formData,
      accountType,
    }

    //setting signup data to state
    //to be used after otp verification
    dispatch(setSignupData(signupData));
    //send otp to user for verification
    dispatch(sendOtp(formData.email, navigate));

    //reset
    setFormData({
      firstname:"",
      lastname:"",
      email:"",
      password:"",
      confirmPassword:"",
    })
    setAccountType(ACCOUNT_TYPE.STUDENT);
  }

  //data to pass to Tab component
  const tabData =[
    {
      id:1,
      tabName:"Student",
      type:ACCOUNT_TYPE.STUDENT
    },
    {
      id:2,
      tabName:"Instructor",
      type:ACCOUNT_TYPE.INSTRUCTOR
    }
  ]

  return (
    <div>
      
    </div>
  )
}

export default SignupForm
