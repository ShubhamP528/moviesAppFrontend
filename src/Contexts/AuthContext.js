import { createContext, useContext, useEffect, useReducer } from "react";
export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { TheatorUser: action.payload };
    case "LOGOUT":
      return { TheatorUser: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { TheatorUser: null });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("TheatorUser"));
    console.log(user);

    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthcontext = () => {
  return useContext(AuthContext);
};
