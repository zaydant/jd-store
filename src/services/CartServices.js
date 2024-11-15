// CartServices.js
import axios from "axios";

const baseUrl = "http://localhost:8080/api/cart";

export const getCartByUid = async (uid, token) => {
  try {
    const response = await axios.get(`${baseUrl}/${uid}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data);
      throw new Error(`Failed to fetch cart: ${error.response?.data?.message || error.message}`);
    }
    console.error('Error:', error);
    throw new Error("Failed to fetch cart. Please try again later.");
  }
};