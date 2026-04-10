import {studentEndpoints} from '../apis'

const {COURSE_PAYEMENT_API, COURSE_VERIFY_API, SEND_PAYEMENT_SUCCESS_EMAIL_API}=studentEndpoints;

// ye function ka url leta (loadscript)
function loadScript(src){
    //ye function promise return karta hai
    return new Promise((resolve)=>{
        // <script> tag create kar raha hai dynamically
        const script= document.createElement("script");
        //jo url pass karenge wo script ka source ban jayega
        script.src=src;
        //jab script successfully load ho jaye
        //promise success ho gaya
        script.onload=()=>{
            resolve(true);
        }
        //agar script load fail ho jaye
        script.onerror=()=>{
            resolve(false);
        }
        //promise fail nhi reject ho raha , bas false return kar rah he
        document.body.appendChild(script);
        //script ko page me add kar diya 
    })
}

export async function buytoken(token, courses, userDetails, navigate, dispatch) {
    try {
      //load the script
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js",
      );
      if (!res) {
        toast.error("Razorpay SDK failed to load");
        return;
      }
      // initiate the order
      const orderResponse = await apiConnector(
        "POST",
        COURSE_PAYEMENT_API,
        { courses },
        {
          Authorization: `Bearer ${token}`,
        },
      );
      if (!orderResponse.data.success) {
        throw new Error(orderResponse.data.message);
      }
      console.log(orderResponse);
      //options
      const options = {
        key: process.env.RAZORPAY_KEY,
        currency: orderResponse.data.message.currency,
        amount: `${orderResponse.data.message.amount}`,
        order_id: orderResponse.data.message.id,
        name: "StudyNotion",
        description: "Thank you for purchasing the course",
        image: rzpLogo,
        prefill: {
          name: `${userDetails.firstName}`,
          email: userDetails.email,
        },
        handler: function (response) {
          sendpaymentSuccessEmail(
            response,
            orderResponse.data.message.amount,
            token,
          );
          verifyPayement({ ...response, courses }, token, navigate, dispatch);
        },
      };
      const payementObject = new window.Razorpay(options);
      payementObject.open();
      payementObject.on("payement failed", function (response) {
        toast.error("oops, payement failed");
        console.log(response.error);
      });
    } catch (error) {
        console.log("Payement api error ...", error);
        toast.error("could not make payement");
    }
    toast.dismiss(toastId);
}

async function sendpaymentSuccessEmail(response,amount,token){
    try{
        await apiConnnector("POST",SEND_PAYEMENT_SUCCESS_EMAIL_API,{
            orderId:response.razorpay_order_id,
            payemntId:response.razorpay_payement_id,
            amount,
        },{
            Authorization:`Bearer ${token}`
        })
    }
    catch(error){
        console.log("Payement success email error ...", error);
    }
}

//verify payment
async function verifyPayement(bodyData, token, navigate, dispatch){
    dispatch(setPayementLoading(true));
    try{
        const response = await apiConnector("POST",COURSE_VERIFY_API,bodyData,{
            Authorization:`Bearer ${token}`,
        })
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success("payement successful, you are added to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    }
    catch(error){
        console.log("Payement verify error ...", error);
        toast.error("could not verify payement");
    }
    toast.dismiss(toastId);
    dispatch(setPayementLoading(false));
}