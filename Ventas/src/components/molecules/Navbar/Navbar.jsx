import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default function Navigation() {
  return (
    <>
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className="bg-body-tertiary" id='navbar'>
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/empleados" className="nav-link">Empleados</NavLink>
            <NavLink to="/clientes" className="nav-link">Clientes</NavLink>
            <NavLink to="/productos" className="nav-link">Productos</NavLink>
            <NavLink to="/ventas" className="nav-link">Ventas</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    
    </>
  );
}
