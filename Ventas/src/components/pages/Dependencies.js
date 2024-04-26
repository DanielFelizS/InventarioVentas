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
import api from '../../../config'

export {
    Productos,
    Empleados,
    Clientes, 
    Ventas, 
    Inicio,
    AgregarCliente,
    AgregarEmpleado,
    AgregarVenta,
    AgregarProducto,
    EditarProducto, 
    EditarCliente,
    EditarEmpleado,
    EditarVenta,
    BtnAction, Table,
    FormInput, api
}