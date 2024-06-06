import Productos from './HomePages/Productos'
import Empleados from './HomePages/Empleados'
import Clientes from './HomePages/Clientes'
import Ventas from './HomePages/Ventas'
import Inicio from './HomePages/Inicio'
import EditarProducto from './CrudPages/Productos/EditarProducto'
import EditarCliente from './CrudPages/Clientes/EditarCliente'
import EditarEmpleado from './CrudPages/Empleados/EditarEmpleado'
import EditarVenta from './CrudPages/Ventas/EditarVenta'
import BtnAction  from '../atoms/Button/Button'
import Table from '../organisms/Table'
import FormInput from '../atoms/Input/Input' 
import AgregarProducto from './CrudPages/Productos/AgregarProducto'
import AgregarCliente from './CrudPages/Clientes/AgregarCliente'
import AgregarVenta from './CrudPages/Ventas/AgregarVenta'
import AgregarEmpleado from './CrudPages/Empleados/AgregarEmpleado'
import EliminarProducto from './CrudPages/Productos/EliminarProducto'
import EliminarCliente from './CrudPages/Clientes/EliminarCliente'
import EliminarEmpleado from './CrudPages/Empleados/EliminarEmpleado'
import EliminarVenta from './CrudPages/Ventas/EliminarVenta'
import api from '../../../config'
import useSearch from '../hooks/useSearch'
import useExport from "../hooks/useExport";
import { useNavigate } from "react-router-dom";


export {
    Productos,
    Empleados,
    Clientes, 
    Ventas, 
    Inicio,
    AgregarCliente, AgregarEmpleado, AgregarVenta,
    AgregarProducto,
    EditarProducto, 
    EditarCliente,
    EditarEmpleado,
    EditarVenta,
    EliminarProducto, EliminarCliente, EliminarEmpleado,
    EliminarVenta,
    BtnAction, Table,
    FormInput, api, useNavigate,
    useSearch, useExport
}