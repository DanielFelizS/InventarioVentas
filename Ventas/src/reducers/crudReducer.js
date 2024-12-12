import { CrudTypes } from "@/actions/CrudActions";
export const INITIAL_STATE = {
    edit: {},
    dataDelete: [],
    error: ""
}

export function crudReducer(state, action) {
    switch (action.type) {
        case CrudTypes.EDITAR_DATO:
            return {
                ...state,
                edit: state.edit.map((data) => {data.id === action.payload.id ? action.payload : data}),
                // error: false
            };
        case CrudTypes.ELIMINAR_DATO:
            return {
                ...state,
                dataDelete: state.dataDelete.filter((data) => data.id !== action.payload),
                // error: false
            };
        case CrudTypes.ERROR:
            return {
                ...state,
                // error: true
                error: action.payload
            }
        default:
            break;
    }
}