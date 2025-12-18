import {useState} from "react"
import {toast} from "react-hot-toast"
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

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
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    console.log(password, " ")
    console.log(confirmPassword)
    if(password !== confirmPassword){
      toast.error("Password do not match");
      return;
    }
    if(!isPasswordValid(password)){
        toast.error(
          "password must be at least 8 characters long and include uppercase, lowercase, number, and specials character"
        )
        console.log(formData.firstname, formData.email, formData.lastname, formData.password)
        return;
    }

    const signupData ={
      ...formData,
      accountType,
    }
    {console.log(formData.email)}
    //setting signup data to state
    //to be used after otp verification
    dispatch(setSignupData(signupData));
    //send otp to user for verification
    dispatch(sendOtp(formData.email),navigate);

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
      {/* Tab */}
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />
      <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
        <div className="flex gap-x-4">
          <label style={{ position: "relative" }}>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-white font-bold">
              First Name <sup className="text-pink-300">*</sup>
            </p>
            <FaUser
              style={{
                color: "grey",
                position: "absolute",
                top: "calc(49%)",
                left: "2.85%",
                fontSize: "20px",
              }}
            />
            <input
              type="text"
              required
              name="firstname"
              value={firstname}
              onChange={handleOnchange}
              placeholder="Enter first name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                paddingLeft: "35px",
              }}
              className="w-full rounded-[0.5rem] bg-[] p-[12px] text-white font-bold"
            />
          </label>
          <label style={{ position: "relative" }}>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-white font-bold">
              Last Name <sup className="text-pink-300">*</sup>
            </p>
            <FaUser
              style={{
                color: "grey",
                position: "absolute",
                top: "calc(49%)",
                left: "2.85%",
                fontSize: "20px",
              }}
            />
            <input
              required
              type="text"
              name="lastname"
              value={lastname}
              onChange={handleOnchange}
              placeholder="Enter the last name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                paddingLeft: "35px",
              }}
              className="w-full rounded-[0.5rem] bg-[] p-[12px] text-white font-bold"
            />
          </label>
        </div>
        <label className="w-full" style={{ position: "relative" }}>
          <p className="mb-1 text-[0.875rem] text-white font-bold">
            Email Address <sup className="text-pink-300">*</sup>
          </p>
          <SiGmail
            style={{
              color: "grey",
              position: "absolute",
              top: "calc(53%)",
              left: "1.85%",
              fontSize: "20px",
            }}
          />
          <input
            required
            type="text"
            name="email"
            value={email}
            onChange={handleOnchange}
            placeholder="Enter email address"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              paddingLeft: "35px",
            }}
            className="w-full rounded-[0.5rem] bg-[] p-[12px] text-white font-bold"
          />
        </label>
        <div className="flex gap-x-4">
          <label className="relative" style={{ position: "relative" }}>
            <p className="mb-1 text-[0.875rem] text-white font-bold">
              Create Password <sup className="text-pink-300">*</sup>
            </p>
            <FaLock
              style={{
                color: "grey",
                position: "absolute",
                top: "calc(52%)",
                left: "4.85%",
                fontSize: "20px",
              }}
            />
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnchange}
              placeholder="Enter Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                paddingLeft: "35px",
              }}
              className="w-full rounded-[0.5rem] bg-[] p-[12px] pr-10 text-white font-bold"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10px] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
          <label className="relative" style={{ position: "relative" }}>
            <p className="mb-1 text-[0.875rem] text-white font-bold">
              Confirm Password <sup className="text-pink-300">*</sup>
            </p>
            <FaLock
              style={{
                color: "grey",
                position: "absolute",
                top: "calc(52%)",
                left: "4.85%",
                fontSize: "20px",
              }}
            />
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnchange}
              placeholder="confirm password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                paddingLeft: "35px",
              }}
              className="w-full rounded-[0.5rem] bg-[] p-[12px] text-white font-bold"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10px] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-yellow-300 py-[8px] px-[12px] font-medium text-[]"
          // onClick={handleOnSubmit}
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

export default SignupForm
