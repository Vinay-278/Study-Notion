import {studentEndpoints} from '../apis'
import { apiConnector } from "../apiconnector";
import { toast } from "react-hot-toast";
import {resetCart } from "../../Slice/cartSlice";
import {setPayementLoading} from '../../Slice/courseSlice'
import rzpLogo from "../../assets/Logo/rzp_logo.png";

const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
}=studentEndpoints;

// Load Razorpay Script
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
}

// Buy Token (Main Payment Function)
export async function buyCourse(
  token,
  courses,
  userDetails,
  navigate,
  dispatch,
) {
  const toastId = toast.loading("Loading...");

  try {
    // 1. Load Razorpay SDK
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js",
    );

    if (!res) {
      toast.error("Razorpay SDK failed to load");
      return;
    }

    // 2. Create Order
    const orderResponse = await apiConnector(
      "POST",
      COURSE_PAYMENT_API,
      { course: courses },
      {
        Authorization: token.replace(/^"|"$/g, ""),
      },
    );
    {console.log(orderResponse)}
    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message);
    }

    const orderData = orderResponse.data.message;

    // 3. Razorpay Options
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      currency: orderData.currency,
      amount: orderData.amount,
      order_id: orderData.id,
      name: "StudyNotion",
      description: "Thank you for purchasing the course",
      image: rzpLogo,
      prefill: {
        name: userDetails.firstName,
        email: userDetails.email,
      },
      handler: function (response) {
        // Send Email
        sendPaymentSuccessEmail(response, orderData.amount, token);

        // Verify Payment
        verifyPayment({ ...response, courses }, token, navigate, dispatch);
      },
    };

    // 4. Open Razorpay
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    // 5. Handle Failure
    paymentObject.on("payment.failed", function (response) {
      toast.error("Oops, payment failed");
      console.log(response.error);
    });
  } catch (error) {
    console.log("Payment API error...", error);
    toast.error("Could not make payment");
  }

  toast.dismiss(toastId);
}

// Send Payment Success Email
async function sendPaymentSuccessEmail(response, amount, token) {
  try {
    await apiConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      },
      {
        Authorization: token,
      },
    );
  } catch (error) {
    console.log("Payment success email error...", error);
  }
}

// Verify Payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
  dispatch(setPayementLoading(true));

  try {
    const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
      Authorization: token.replace(/^"|"$/g, ""),
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Payment successful, you are enrolled!");
    navigate("/dashboard/enrolled-courses");
    dispatch(resetCart());
    {console.log(token)}
  } catch (error) {
    console.log("Payment verify error...", error);
    toast.error("Could not verify payment");
  }

  dispatch(setPayementLoading(false));
}
