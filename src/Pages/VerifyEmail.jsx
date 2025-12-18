import React, { useEffect, useState } from 'react'
import OtpInput from 'react-otp-input'
import {Link, useNavigate} from 'react-router-dom'
import {BiArrowBack} from 'react-icons/bi'
import {RxCountdownTimer} from 'react-icons/rx'
import {useDispatch, useSelector} from 'react-redux'
import {sendOtp,signUp} from '../Service/operations/authAPI'

const VerifyEmail = () => {
    const [otp,setOtp] =useState("");
    const {signUpData, loading} = useSelector((state)=>state.auth)
    const dispatch = useDispatch();
    const navigate= useNavigate();

    useEffect(()=>{
        //only allow access of this route when user has filled the signup form
        if(!signUpData){
            navigate("/signup");
        }
    },[])

    const handleVerifyAndSignup =(e) =>{
        e.preventDefault();
        const {
            accountType,
            firstname,
            lastname,
            email,
            password,
            confirmPassword
        } =signUpData
        dispatch(
            signUp(
                accountType,
                firstname,
                lastname,
                email,
                password,
                confirmPassword,
                otp,
                navigate
            )
        )
    }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
      {loading ? (
        <div>
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-white font-semibold text-[1.875rem]">
            Verify Email
          </h1>
          <p className="text-[1.125rem] my-4 text-[]">
            A verification code has been sent to you. Enter the code below
          </p>
          <form onSubmit={handleVerifyAndSignup}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className='w-[48px] lg:w-[60px] border-0 bg-[] rounded-[0.5rem] text-white aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-300'
                />
              )}
              containerStyle={{
                justifyContent:"space-between",
                gap:"0 6px"
                }}
            />
            <button type='submit' className='w-full bg-yellow-300 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-[]'>
                Verify Email
            </button>
          </form>
          <div className='mt-6 flex items-center jsutlfy-between'>
            <Link to="/signup">
            <p className='text-white flex items-center gap-x-2'>
                <BiArrowBack/> Back To Signup
            </p>
            </Link>
            <button className='flex items-center text-blue-300 gap-x-2' onClick={()=>dispatch(sendOtp(signUpData.email))}>
                <RxCountdownTimer/>
                Resend it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail
