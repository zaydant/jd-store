"use client";

import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { setUser, setToken } from "@/store/slices/AuthSlice";

export function useAuth() {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const router = useRouter();

  const logout = () => {
    // Clear the user and token from Redux store
    dispatch(setUser(null));
    dispatch(setToken(null));

    document.cookie = "authToken=; Max-Age=0; path=/;";

    // Redirect to home
    router.push("/");
  };

  return { user, token, logout };
}
