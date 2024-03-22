import { useState } from "react";
import { useAuthcontext } from "../Contexts/AuthContext";
// import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthcontext();

  //   const navigate = useNavigate();

  const signup = async (username, email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      "https://moviesappbackend.onrender.com/api/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      }
    );
    const json = await response.json();
    console.log(json);

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      // save the user to local storage

      localStorage.setItem("TheatorUser", JSON.stringify(json));

      toast.success("Successfully login with signup");
      // update the auth context
      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
      //   navigate("/home");
    }
  };

  return { signup, isLoading, error };
};
