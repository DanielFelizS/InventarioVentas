import { ClientesTypes } from '../actions/Cliente'

export const INITIAL_STATE = {
    cliente: []
}
export const ClientesDatos = {
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    dni: ""
}

export function clientesReducer(state, action) {
    switch (action.type) {
        case ClientesTypes.CHANGE_INPUT:
            return {...state, [action.payload.name]:action.payload.value};
        case ClientesTypes.CREAR_CLIENTE:
            return {...state, cliente: [...state.cliente, action.payload]};
        case ClientesTypes.EDITAR_CLIENTE:
            return {
                ...state,

            };
        case ClientesTypes.ELIMINAR_CLIENTE:
            return {
                ...state,

            };
        case ClientesTypes.OBTENER_DATOS_CLIENTE:
            return {...state, cliente: action.payload.map(data => data)};
        case ClientesTypes.OBTENER_ID_CLIENTE:
            return {...state, cliente: action.payload };
        default:
            return state;
    }
}