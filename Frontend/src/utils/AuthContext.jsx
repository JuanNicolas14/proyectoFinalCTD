import { createContext, useReducer } from "react";

export const AuthContext = createContext();

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  accessToken: localStorage.getItem("token") || null,
  
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload.accessToken)
      localStorage.setItem("user", JSON.stringify(action.payload.user))
      console.log("Ejecutando LOGIN del context")
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
      };
    case "LOGOUT":
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      console.log("Ejecutando LOGOUT del context")
      return {
        ...state,
        user: null,
        accessToken: null,
      };
    
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const data = {
    dispatch,
    user: state.user,
    token: state.accessToken,
    reserva: state.reserva
  }

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;