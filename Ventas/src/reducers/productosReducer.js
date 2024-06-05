/* eslint-disable no-case-declarations */
import { ProductosTypes } from '../actions/Productos'

export const INITIAL_STATE = {
    productos: [],
}
export const ProductosData = {
    producto: "",
    precio : 0,
    descripcion: ""
}

export function productosReducer(state, action) {

    switch (action.type) {
        case ProductosTypes.CHANGE_INPUT: 
        return {
            ...state,
            [action.payload.name]:action.payload.value
        }
        case ProductosTypes.CREAR_PRODUCTO:
            return {
                ...state, productos:[...state.productos, action.payload]
            };
            case ProductosTypes.EDITAR_PRODUCTO:
                return {
                    ...state,
                    productos: state.productos.map((producto) => {producto.id === action.payload.id ? action.payload : producto})
                    
                };
        case ProductosTypes.ELIMINAR_PRODUCTO:
            return {
                ...state,

            };
        case ProductosTypes.OBTENER_DATOS_PRODUCTO:
            return {
                ...state, productos: action.payload.map(producto => producto)
            };
        case ProductosTypes.OBTENER_ID_PRODUCTO:
            return {
                ...state, productos: action.payload
            };
        default:
            return state;
    }
}