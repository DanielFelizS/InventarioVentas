import { useState, useEffect, useReducer } from "react";
import api from "../../../config";
import { empleadosReducer} from "../../reducers/empleadosReducer";
import { clientesReducer} from "../../reducers/clientesReducer";
import { productosReducer} from "../../reducers/productosReducer";
import { ventasReducer } from "../../reducers/ventasReducer"
import { INITIAL_STATE } from "../../reducers/crudStates";
import { EmpleadosTypes } from '../../actions/Empleados'
import { ClientesTypes } from '../../actions/Cliente'
import { ProductosTypes } from '../../actions/Productos'
import { VentasTypes } from '../../actions/Ventas'
import { useNavigate, useParams } from "react-router-dom";
import { crudReducer } from "../../reducers/crudReducer";
import { CrudTypes } from "../../actions/CrudActions";

export {
    useState, useEffect, useReducer, api, 
    empleadosReducer, clientesReducer, productosReducer, ventasReducer,
    INITIAL_STATE, useParams, useNavigate,
    EmpleadosTypes, ClientesTypes, ProductosTypes, VentasTypes,
    crudReducer, CrudTypes
}