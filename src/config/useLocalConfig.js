export const GetFunctionHalls = "https://partyzbackendapplication-66iz.onrender.com/api/getFunctionHalls"
export const GetBookingDateDetails = "https://partyzbackendapplication-66iz.onrender.com/api/getBookingDateDetails"
export const SupervisorIdPostingBackend = "https://partyzbackendapplication-66iz.onrender.com/api/postSupervisorUserId"
export const getFunctionHallsBySupervisorUserId = "https://partyzbackendapplication-66iz.onrender.com/api/getFunctionHallsBySupervisorUserId"
export const PostUserDetails =  "https://partyzbackendapplication-66iz.onrender.com/api/postUserDetails"
export const PostBookingDatesDetails =  "https://partyzbackendapplication-66iz.onrender.com/api/postUserDetails"
export const PostUserPhoneNumber = "https://partyzbackendapplication-66iz.onrender.com/api/userPhoneNumber"
export const getAllUserBookings =  "https://partyzbackendapplication-66iz.onrender.com/api/getAllUserBookings"
export const postBookingDate =  "https://partyzbackendapplication-66iz.onrender.com/api/postBookingDate"


// Define the base URL
export const BASE_URL = "https://partyzbackendapplication-66iz.onrender.com/api/updateRequestById/";

// Create a function to generate the full URL
export const getUpdateBookingRequestUrl = (itemId) => `${BASE_URL}${itemId}`;
