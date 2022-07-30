import axios from "axios";

const url: string = "https://freshmartapi.herokuapp.com/";
// const Lurl: string = "http://localhost:8080";

const apiUrl = {
  signUp: "user/signup",
  signIn: "user/signin",
  getUser: "user/getuser",
  filterProduct: "product/filter",
  getSingleProduct: "product/get",
  addCart: "cart/addCart",
  getCart: "cart/getCart",
  updateCart: "cart/update",
  deleteCart: "cart/delete",
  paymentIntent: "payment/pay",
  paymentAdd: "payment/sucess",
  getProfile: "profile/get",
  updateProfile: "profile/update",
  getFavorite: "favorite/get",
  addFavorite: "favorite/add",
  deleteFavorite: "favorite/delete",
};
export const getSingleProductApi = async (body: any) => {
  try {
    const res = await axios.post(url + apiUrl.getSingleProduct, body);
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};
export const deleteFavorite = async (body: any) => {
  try {
    const res = await axios.post(url + apiUrl.deleteFavorite, body);
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};
export const addFavoriteApi = async (body: any) => {
  try {
    const res = await axios.post(url + apiUrl.addFavorite, body);
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};
export const getFavoriteApi = async (body: any) => {
  try {
    const res = await axios.post(url + apiUrl.getFavorite, body);
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};

export const updateProfileApi = async (body: any) => {
  try {
    const res = await axios.post(url + apiUrl.updateProfile, body);
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};

export const getProfileApi = async (body: getProfileType) => {
  try {
    const res = await axios.post(url + apiUrl.getProfile, body);
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};

export const paymentAddApi = async (body: any) => {
  try {
    const res = await axios.post(url + apiUrl.paymentAdd, body);
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};

export const createPaymentIntentApi = async (body: any) => {
  try {
    const res = await axios.post(url + apiUrl.paymentIntent, body);
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};
export const deleteCartApi = async (body: deleteCartDataType) => {
  try {
    const res = await axios.post(url + apiUrl.deleteCart, body);
    return res.data;
  } catch (err) {
    console.error({ err });
  }
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
