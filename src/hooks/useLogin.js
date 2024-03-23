import { useState } from "react";
import { useAuthcontext } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useSignin = () => {
  const [errorL, setErrorL] = useState(null);
  const [isLoadingL, setIsLoadingL] = useState(null);
  const { dispatch } = useAuthcontext();

  const navigate = useNavigate();

  const signin = async (username, password) => {
    setIsLoadingL(true);
    setErrorL(null);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const json = await response.json();
      console.log(json);

      if (!response.ok) {
        toast.error(json.error);
        setIsLoadingL(false);
        setErrorL(json.error);
      }

      if (response.ok) {
        // save the user to local storage
        localStorage.setItem("TheatorUser", JSON.stringify(json));

        toast.success("Successfully login");
        // update the auth context
        dispatch({ type: "LOGIN", payload: json });

        setIsLoadingL(false);
        navigate("/");
      }
    } catch (err) {
      setIsLoadingL(false);
      setErrorL(err.message);
    }
  };

  return { signin, isLoadingL, errorL };
};
