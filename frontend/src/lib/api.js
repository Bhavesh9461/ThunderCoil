import { axiosInstance } from "./axios.js";

// for signing up
export const signup = async (signupData) => {
  const response = await axiosInstance.post("/auth/signup", signupData);
  return response.data;
};

// get user
export const getAuthUser = async () => {
  const res = await axiosInstance.get("/auth/me");
  return res.data;
};

// complete onboarding
export const completeOnboarding = async (userData) => {
  const res = await axiosInstance.post("/auth/onboarding", userData);
  return res.data;
};
