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
  const response = await axiosInstance.post("/auth/onboarding", userData);
  return response.data;
};


// get all friends
export async function getUserFriends() {
  const response = await axiosInstance.get("/users/friends")
  return response.data
}

// get all recommended users
export async function getRecommendedUsers() {
  const response = await axiosInstance.get("/users")
  return response.data
}

// get all outgoing sent requests
export async function getOutgoingFriendReqs() {
  const response = await axiosInstance.get("/users/outgoing-friend-requests")
  return response.data
}

// send friend request
export async function sendFriendRequest(userId) {
  const response = await axiosInstance.post(`/users/friend-request/${userId}`)
  return response.data
}

// get friend requests
export async function getFriendRequests() {
  const response = await axiosInstance.get("/users/friend-requests")
  return response.data
}

// accept friend request
export async function acceptFriendRequest(requestId) {
  const response = await axiosInstance.put(`/users/friend-request/${requestId}/accept`)
  return response.data
}

// get stream token
export async function getStreamToken() {
  const response = await axiosInstance.get("/chat/token")
  return response.data
}