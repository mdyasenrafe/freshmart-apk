import axios from "axios";

const url = "https://freshmartapi.herokuapp.com/";

const apiUrl = {
  signUp: "user/signup",
  signIn: "user/signin",
  getUser: "user/getuser",
  filterProduct: "product/filter",
  addCart: "cart/addCart",
};

export const SignupApi = async (body) => {
  try {
    const res = await axios.post(url + apiUrl.signUp, body);
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};
export const signInApi = async (body) => {
  try {
    const res = await axios.post(url + apiUrl.signIn, body);
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};
export const filterProductAPi = async (body) => {
  try {
    const res = await axios.post(url + apiUrl.filterProduct, body);
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};
export const addCartApi = async (body) => {
  try {
    const res = await axios.post(url + apiUrl.addCart, body);
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};
