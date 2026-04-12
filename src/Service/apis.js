const BASE_URL = 'http://localhost:4000/api/v1'

//Auth Endpoints
export const endpoints ={
    SENDOTP_API:BASE_URL+'/auth/sendotp',
    SIGNUP_API:BASE_URL+'/auth/signup',
    LOGIN_API:BASE_URL+'/auth/login',
    RESETPASSTOKEN_API:BASE_URL+'/auth/reset-password-token',
    RESETPASSWORD_API:BASE_URL+'/auth/reset-password',
}

//student endpoints
export const studentEndpoints = {
  COURSE_PAYMENT_API: BASE_URL + '/payment/capturePayment',
  COURSE_VERIFY_API: BASE_URL + '/payment/verifyPayment',
  SEND_PAYMENT_SUCCESS_EMAIL_APIBASE_URL : BASE_URL + '/payment/sendPaymentSuccessEmail',
};

//Categories api

export const categories = {
  CATEGORIES_API: BASE_URL + "/course/showAllCategory",
};

//Contact us api

export const contactusEndpoint ={
  CONTACT_US_API:BASE_URL+'/reach/contact',
}
