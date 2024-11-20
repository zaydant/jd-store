import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = "http://localhost:8080/api/auth";

export async function loginUserService(userData) {
  const url = `${baseUrl}/login`;

  try {
    const response = await axios.post(url, userData, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });

    const result = response.data;
    //   console.log(result)

    // Save token in cookie
    if (result.user?.token) {
      Cookies.set("authToken", result.user.token, { expires: 7 });
    }

    return {
      message: result.message,
      user: {
        user: {
          uid: result.user.uid,
          email: result.user.email,
          name: result.user.name,
          role: result.user.role,
        },
        token: result.user.token,
      },
    };
  } catch (error) {
    console.error("Login Service Error:", error);
    return {
      message: "Login failed",
      user: null,
      error:
        error.response?.data?.error ||
        error.message ||
        "An unexpected error occurred during login",
    };
  }
}
