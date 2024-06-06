import "bootstrap/dist/css/bootstrap.min.css";
import {
  Productos,
  Empleados,
  Clientes,
  Ventas,
  AgregarCliente,
  AgregarEmpleado,
  AgregarVenta,
  AgregarProducto,
  EditarProducto,
  EditarCliente,
  EditarEmpleado,
  EditarVenta,
  EliminarProducto,
  EliminarCliente,
  EliminarEmpleado,
  EliminarVenta,
} from "./components/pages/Dependencies";
import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Navigation from "./components/molecules/Navbar/Navbar";
import "./App.css";

export default function App() {

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname == "/") {
      navigate("/empleados");
    }
  }, [navigate, location]);
  return (
    <>
    <Navigation/>
      <Routes>
          <Route path="/empleados" element={<Empleados />} />
          <Route path="/agregar_empleado" element={<AgregarEmpleado />} />
          <Route path="/editar_empleado/:id" element={<EditarEmpleado />} />
          <Route path="/eliminar_empleado/:id" element={<EliminarEmpleado />} />

          <Route path="/clientes" element={<Clientes />} />
          <Route path="/agregar_cliente" element={<AgregarCliente />} />
          <Route path="/editar_cliente/:id" element={<EditarCliente />} />
          <Route path="/eliminar_cliente/:id" element={<EliminarCliente />} />

          <Route path="/productos" element={<Productos />} />
          <Route path="/agregar_producto" element={<AgregarProducto />} />
          <Route path="/editar_producto/:id" element={<EditarProducto />} />
          <Route path="/eliminar_producto/:id" element={<EliminarProducto />} />

          <Route path="/ventas" element={<Ventas />} />
          <Route path="/agregar_venta" element={<AgregarVenta />} />
          <Route path="/editar_venta/:id" element={<EditarVenta />} />
          <Route path="/eliminar_venta/:id" element={<EliminarVenta />} />
      </Routes>
    </>
  );
}
