import { AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router"
import { SiGmail } from "react-icons/si"
import { FaLock } from "react-icons/fa"
import { useState } from "react"
// import {} from "../../../Service/operations/authAPI"

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch= useDispatch();
    const [formData, setformData] =useState({
        email:"",
        password:""
    })
    const [showPassword, setShowPassword]=useState(false);
    const {email, password}= formData;
    const handleOnChange = (e)=>{
        setformData((prevData)=>({
            ...prevData,
            [e.target.name]:e.target.value,
        }))
    }
    const handleOnSubmit =(e)=>{
        e.preventDefault();
        dispatch(Login(email,password,navigate))
    }

  return (
    <form
      onSubmit={handleOnChange}
      className="mt-6 flex w-full flex-col gap-y-4"
    >
      <label className="w-full" style={{ position: "relative" }}>
        <p className="mb-1 text-[0.875rem] text-white font-bold">
          Email Address <sup className="text-pink-300">*</sup>
        </p>
        <SiGmail
          style={{
            color: "grey",
            position: "absolute",
            top: "calc(49%)",
            left: "1.65%",
            fontSize: "20px",
          }}
        />
        <input
          required
          type="text"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email address"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)",
            paddingLeft: "35px",
          }}
          className="w-full rounded-[0.5rem] bg-[] p-[11px] pr-12 text-white font-bold"
        />
      </label>
      <label className="relative">
        <FaLock
          style={{
            color: "grey",
            position: "absolute",
            top: "calc(42%)",
            left: "1.65%",
            fontSize: "20px",
          }}
        />
        <p className="mb-1 text-[0.875rem] text-white font-bold">
          Password <sup className="text-pink-300">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleOnChange}
          placeholder="Enter password"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            paddingLeft: "35px",
          }}
          className="w-full rounded-[0.5rem] bg-[] p-[12px] pr-12 text-white font-bold"
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[38px] z-[10] cursor-pointer"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
          )}
        </span>
        <Link to="/forgot-password">
          <p className="mt-1 ml-auto max-w-max text-xs text-blue-300 font-bold">
            Forgot Password
          </p>
        </Link>
      </label>
      <button
        type="submit"
        className="mt-6 rounded-[8px] bg-yellow-300 py-[8px] px-[12px] font-medium text-[]"
      >
        Sign In
      </button>
    </form>
  );
}

export default LoginForm
