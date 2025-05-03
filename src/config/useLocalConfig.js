export const GetFunctionHalls = "http://localhost:4000/api/getFunctionHalls"
export const GetBookingDateDetails = "http://localhost:4000/api/getBookingDateDetails"
export const SupervisorIdPostingBackend = "http://localhost:4000/api/postSupervisorUserId"
export const getFunctionHallsBySupervisorUserId = "http://localhost:4000/api/getFunctionHallsBySupervisorUserId"
export const PostUserDetails =  "http://localhost:4000/api/postUserDetails"
export const PostBookingDatesDetails =  "http://localhost:4000/api/postUserDetails"
export const PostUserPhoneNumber = "http://localhost:4000/api/userPhoneNumber"
export const getAllUserBookings =  "http://localhost:4000/api/getAllUserBookings"
export const postBookingDate =  "http://localhost:4000/api/postBookingDate"


// Define the base URL
export const BASE_URL = "http://localhost:4000/api/updateRequestById/";

// Create a function to generate the full URL
export const getUpdateBookingRequestUrl = (itemId) => `${BASE_URL}${itemId}`;
