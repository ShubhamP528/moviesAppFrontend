// import { useNavigate } from "react-router-dom";
import { useAuthcontext } from "../Contexts/AuthContext";
import toast from "react-hot-toast";

export const useLogout = () => {
  const { dispatch } = useAuthcontext();
  // const navigate=useNavigate()

  const logout = () => {
    // remove user form local storage

    localStorage.removeItem("TheatorUser");

    toast.success("Successfully logout");
    // dispatch logout action
    dispatch({ type: "LOGOUT" });
    // navigate('/home')
  };

  return { logout };
};
