import { createContext, useReducer } from "react";

export const FilterContext = createContext();

const initialState = {
  ciudad: "",
  plan:"",
  restaurantesFiltrados:[],
  restaurantesRecomendados:[]
};

const filterReducer = (state, action) => {
  switch (action.type) {
    case "SAVE":
      console.log("Ejecutando SAVE del FilterContext")
      return {
        ...state,
        ciudad: action.payload.ciudad,
        plan: action.payload.plan,
        hora: action.payload.hora,
        restaurantesFiltrados: action.payload.restaurantesFiltrados,
        restaurantesRecomendados: action.payload.restaurantesRecomendados
      };
    default:
      return state;
  }
};

const FilterContextProvider = ({ children }) => {
  const [state, dispatchFilter] = useReducer(filterReducer, initialState);

  const data = {
    dispatchFilter,
    ciudad: state.ciudad,
    plan: state.plan,
    hora: state.hora,
    restaurantesFiltradosGuardados: state.restaurantesFiltrados,
    restaurantesRecomendados: state.restaurantesRecomendados
  }

  return <FilterContext.Provider value={data}>{children}</FilterContext.Provider>;
};

export default FilterContextProvider;