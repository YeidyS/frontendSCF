import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar,Nav,NavDropdown,Button,Form,FormControl,Container} from "react-bootstrap";
import {Link} from 'react-router-dom';
import '../estilos/home.css'


export default function Bootstrap(){
    return (
    <Navbar className="menu" bg="black" expand="lg" variant="dark">
    <Container>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto navegar">
          <Link className="nav-link" to='/inicio'>Inicio</Link>
          <Link className="nav-link" to='/registraractivo'>Registrar Activo</Link>
          <Link className="nav-link link-admin"  to='/registrarempleado'>Registrar Empleado</Link>
          <Link className="nav-link link-admin"  to='/registrartipodeactivo'>Registrar tipo de activo</Link>
          {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown> */}
          <Button className="cerrar" variant="light">Cerrar Sección</Button>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

//export default Header;