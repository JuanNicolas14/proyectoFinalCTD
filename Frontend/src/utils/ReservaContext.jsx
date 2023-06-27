import { createContext, useReducer } from "react";

export const ReservaContext = createContext();

const initialState = {
    horaEntrega: '',
    fechaInicio: '',
    fechaFinalizacion: '',
    direccionEntrega: '',
    usuarioId: '',
    ciudadId: '',
    restauranteId: '',
    restauranteContext: {}
}

const reservaReducer = (state, action) => {
    switch (action.type) {
        case "RESERVA":
            return {
                horaEntrega: action.payload.horaEntrega,
                fechaInicio: action.payload.fechaInicio,
                fechaFinalizacion: action.payload.fechaFinalizacion,
                direccionEntrega: action.payload.direccionEntrega,
                usuarioId: action.payload.usuarioId,
                ciudadId: action.payload.ciudadId,
                restauranteId: action.payload.restauranteId,
                restauranteContext: action.payload.restauranteContext
            }
        default:
            return state;
    }
}

const ReservaContextProvider = ({ children }) => {
    const [state, dispatchReserva] = useReducer(reservaReducer, initialState);

    const data = {
        dispatchReserva,
        horaEntrega: state.horaEntrega,
        fechaInicio: state.fechaInicio,
        fechaFinalizacion: state.fechaFinalizacion,
        direccionEntrega: state.direccionEntrega,
        usuarioId: state.usuarioId,
        ciudadId: state.ciudadId,
        restauranteId: state.restauranteId,
        restauranteContext: state.restauranteContext
    }

    return <ReservaContext.Provider value={data}>{children}</ReservaContext.Provider>;
};

export default ReservaContextProvider;