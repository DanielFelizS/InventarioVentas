import { EmpleadosTypes } from '../actions/Empleados'

export const INITIAL_STATE = {
    empleado: [], 
    data: []
}

export const EmpleadosDatos = {
    nombre: "",
    apellido: "",
    sexo: "",
    edad: 0,
    telefono: "",
    email: "",
    dni: "",
    sueldo: 0,
    cargo: "",
    fechaNacimiento: "",
    fechaContratacion: ""
}

export function empleadosReducer(state, action) {
    switch (action.type) {
        case EmpleadosTypes.CHANGE_INPUT:
            return {...state, [action.payload.name]: action.payload.value};
        case EmpleadosTypes.CREAR_EMPLEADO:
            return {
                ...state,
                data: [...state.empleado, action.payload]

            };
        case EmpleadosTypes.EDITAR_EMPLEADO:
            return {
                ...state,

            };
        case EmpleadosTypes.ELIMINAR_EMPLEADO:
            return {
                ...state,

            };
        case EmpleadosTypes.OBTENER_DATOS_EMPLEADO:
            return {
                ...state,
                empleado: action.payload.map(data => data)
            };
        case EmpleadosTypes.OBTENER_ID_EMPLEADO:
            return {
                ...state,
                empleado: action.payload
            };
        default:
            return state;
    }
}