import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/molecules/Navbar/Navbar";
import {
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
} from "./components/pages/Dependencies";
import './App.css'

import { Routes, Route } from "react-router-dom";
export default function App() {
  return (
    <>
      <Navigation />

      <Routes>
        <Route path='/inicio' element={<Inicio />} />
        <Route path='/empleados' element={<Empleados />} />
        <Route path='/agregar_empleado' element={<AgregarEmpleado />} />
        <Route path='/editar_empleado/:id' element={<EditarEmpleado />} />
        <Route path='/clientes' element={<Clientes />} />
        <Route path='/agregar_cliente' element={<AgregarCliente />} />
        <Route path='/editar_cliente/:id' element={<EditarCliente />} />
        <Route path='/productos' element={<Productos />} />
        <Route path='/agregar_producto' element={<AgregarProducto />} />
        <Route path='/editar_producto/:id' element={<EditarProducto />} />
        <Route path='/ventas' element={<Ventas />} />
        <Route path='/agregar_venta' element={<AgregarVenta />} />
        <Route path='/editar_venta/:id' element={<EditarVenta />} />

      </Routes>
    </>
  );
}
