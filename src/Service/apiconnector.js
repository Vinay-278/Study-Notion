// Isse axios library import hoti hai jisse hum API calls kar sakte hain.
import axios from "axios";

//axios.create custom object banata hai
// isme humne defalut setting ko empty kar rakha hai ({})
export const axiosInstance =axios.create({});

//apiConnector ka function  banya
//instead of writing axios.get/ axios.post baar-baar ek hi function se request bhej sakte hai
export const apiConnector =(method, url, bodyData, headers, params) =>{
    return axiosInstance({
      method: `${method}`, // get,post,put,delete
      url: `${url}`, //batata hai request kahan bejna hai
      data: bodyData ? bodyData : null, // POST/PUT ke liye request body
      headers: headers ? headers : null, // auth token wagaira
      params: params ? params : null, //URL ke query parameters
      // https://example.com/products?category=mobile
      //? -> query Start
      //category ->key
      //moblile ->value
    });
}

//axios internally prommise return karta hai, isliye apiConnector bhi ek promise hi return karega