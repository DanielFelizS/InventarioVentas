import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/molecules/Navbar/Navbar";
import {
  Productos,
  Empleados,
  Clientes,
  Ventas,
  Inicio,
  EditarProducto,
  EditarCliente,
  EditarEmpleado,
  EditarVenta
} from "./components/pages/Dependencies";

import { Routes, Route } from "react-router-dom";
export default function App() {
  return (
    <>
      <Navigation />

      <Routes>
        <Route path='/inicio' element={<Inicio />} />
        <Route path='/empleados' element={<Empleados />} />
        <Route path='/empleados/:id' element={<EditarEmpleado />} />
        <Route path='/clientes' element={<Clientes />} />
        <Route path='/clientes/:id' element={<EditarCliente />} />
        <Route path='/productos' element={<Productos />} />
        <Route path='/productos/:id' element={<EditarProducto />} />
        <Route path='/ventas' element={<Ventas />} />
        <Route path='/ventas/:id' element={<EditarVenta />} />

      </Routes>
    </>
  );
}
