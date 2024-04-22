import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/molecules/Navbar/Navbar";
import {
  Productos,
  Empleados,
  Clientes,
  Ventas,
  Inicio,
} from "./components/pages/Dependencies";

import { Routes, Route } from "react-router-dom";
export default function App() {
  return (
    <>
      <Navigation />

      <Routes>
        <Route path='/inicio' element={<Inicio />} />
        <Route path='/empleados' element={<Empleados />} />
        <Route path='/clientes' element={<Clientes />} />
        <Route path='/productos' element={<Productos />} />
        <Route path='/ventas' element={<Ventas />} />
      </Routes>
    </>
  );
}
