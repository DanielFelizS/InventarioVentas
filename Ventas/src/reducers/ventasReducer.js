import { VentasTypes } from '@/actions/Ventas'

export const INITIAL_STATE = {
    venta: []
}
export const VentasDatos = {
    productoId: 0,
    empleadoId: 0,
    clienteId: 0,
    cantidad: 0,
}

export function ventasReducer(state, action) {
    switch (action.type) {
        case VentasTypes.CHANGE_INPUT: 
        return {...state, [action.payload.name]:action.payload.value};
        case VentasTypes.CREAR_VENTAS:
            return {
                ...state,
                venta: [...state.venta, action.payload]
            };
        case VentasTypes.EDITAR_VENTAS:
            return {
                ...state,

            };
        case VentasTypes.ELIMINAR_VENTAS:
            return {
                ...state,

            };
        case VentasTypes.OBTENER_DATOS_VENTAS:
            return {
                ...state,
                venta: action.payload.map(data => data)

            };
        case VentasTypes.OBTENER_ID_VENTAS:
            return {
                ...state,

            };
        default:
            return state;
    }
}