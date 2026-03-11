import { axiosInstance } from "./axios.js";

// for signing up
export const signup = async (signupData) => {
  const response = await axiosInstance.post("/auth/signup", signupData);
  return response.data;
};

// for login
export const login = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
};

// for logout
export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};

// get user
export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    console.log("Error in getAuthUser Api", error);
    return null
  }
};

// complete onboarding
export const completeOnboarding = async (userData) => {
  const res = await axiosInstance.post("/auth/onboarding", userData);
  return res.data;
};
