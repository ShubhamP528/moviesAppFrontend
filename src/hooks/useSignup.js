import { useState } from "react";
import { useAuthcontext } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAppContext } from "../Contexts/AppContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoadingS, setIsLoading] = useState(null);
  const { dispatch } = useAuthcontext();
  const { setRoom } = useAppContext();

  const navigate = useNavigate();

  const signup = async (username, email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const json = await response.json();
      console.log(json);

      if (!response.ok) {
        setIsLoading(false);
        toast.error(json.error);
        setError(json.error);
      }

      if (response.ok) {
        // save the user to local storage

        localStorage.setItem("TheatorUser", JSON.stringify(json));

        toast.success("Successfully login with signup");
        // update the auth context
        dispatch({ type: "LOGIN", payload: json });
        setRoom(json.room);

        setIsLoading(false);
        navigate("/");
      }
    } catch (err) {
      toast.error(err.message);
      setIsLoading(false);
      setError(json.error);
    }
  };

  return { signup, isLoadingS, error };
};
