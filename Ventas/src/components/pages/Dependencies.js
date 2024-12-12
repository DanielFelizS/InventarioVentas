import Productos from '@pages/HomePages/Productos'
import Empleados from '@pages/HomePages/Empleados'
import Clientes from '@pages/HomePages/Clientes'
import Ventas from '@pages/HomePages/Ventas'
// import Inicio from '@pages/HomePages/Inicio'
import EditarProducto from '@CrudPages/Productos/EditarProducto'
import EditarCliente from '@CrudPages/Clientes/EditarCliente'
import EditarEmpleado from '@CrudPages/Empleados/EditarEmpleado'
import EditarVenta from '@CrudPages/Ventas/EditarVenta'
import BtnAction  from '@components/atoms/Button/Button'
import Table from '@components/organisms/Table'
import FormInput from '@components/atoms/Input/Input' 
import AgregarProducto from '@CrudPages/Productos/AgregarProducto'
import AgregarCliente from '@CrudPages/Clientes/AgregarCliente'
import AgregarVenta from '@CrudPages/Ventas/AgregarVenta'
import AgregarEmpleado from '@CrudPages/Empleados/AgregarEmpleado'
import EliminarProducto from '@CrudPages/Productos/EliminarProducto'
import EliminarCliente from '@CrudPages/Clientes/EliminarCliente'
import EliminarEmpleado from '@CrudPages/Empleados/EliminarEmpleado'
import EliminarVenta from '@CrudPages/Ventas/EliminarVenta'
import api from '@root/config'
import useSearch from '@hooks/useSearch'
import useExport from "@hooks/useExport";
import { useNavigate } from "react-router-dom";


export {
    Productos,
    Empleados,
    Clientes, 
    Ventas, 
    // Inicio,
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