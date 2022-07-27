import axios from "axios";

const url: string = "https://freshmartapi.herokuapp.com/";

const apiUrl = {
  signUp: "user/signup",
  signIn: "user/signin",
  getUser: "user/getuser",
  filterProduct: "product/filter",
  addCart: "cart/addCart",
  getCart: "cart/getCart",
  updateCart: "cart/update",
};

export const updateCartApi = async (body: UpdateCartType) => {
  try {
    const res = await axios.post(url + apiUrl.updateCart, body);
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};

export const getCartApi = async (body: GetCartTypes) => {
  try {
    const res = await axios.post(url + apiUrl.getCart, body);
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};

export const SignupApi = async (body: EmailSignUPBodyData) => {
  try {
    const res = await axios.post(url + apiUrl.signUp, body);
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};
export const signInApi = async (body: emailSigninTypes) => {
  try {
    const res = await axios.post(url + apiUrl.signIn, body);
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};
export const filterProductAPi = async (body: FilterProductType) => {
  try {
    const res = await axios.post(url + apiUrl.filterProduct, body);
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};
export const addCartApi = async (body: any) => {
  try {
    const res = await axios.post(url + apiUrl.addCart, body);
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};
