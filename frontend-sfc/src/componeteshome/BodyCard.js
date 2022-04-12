import React from "react";
import imgregist from "../img/imgregistro.png"
import imgempleado from "../img/imgempleado.png"
import imgtipoact from "../img/imgtipoact.png"
import 'bootstrap/dist/css/bootstrap.min.css';
import { CardGroup, Card } from "react-bootstrap";
import '../estilos/home.css';
import { Link } from 'react-router-dom';

export default function Bootstrap() {
  return (
    <body className='cuerpo'>
      <div className="bodycard">
        <CardGroup>
          <Card className="card" border="secondary" style={{ width: '18rem' }}>
            <Link className="nav-link" to='/registraractivo'><Card.Img variant="top" src={imgregist} /></Link>
            <Card.Body>
              <Card.Title>Registrar Activo</Card.Title>
              <Link className="nav-link" to='/registraractivo'>IR</Link>
            </Card.Body>
          </Card>
          <Card className="card-1" border="secondary" style={{ width: '18rem' }}>
            <Link className="nav-link" to='/registrarempleado'><Card.Img variant="top" src={imgempleado} /></Link>
            <Card.Body>
              <Card.Title>Registrar Empleado</Card.Title>
              <Link className="nav-link" to='/registrarempleado'>IR</Link>
            </Card.Body>
          </Card>
          <Card className="card-1" border="secondary"  style={{ width: '18rem' }}>
            <Link className="nav-link" to='/registrartipodeactivo'> <Card.Img variant="top" src={imgtipoact} /></Link>
            <Card.Body>
              <Card.Title>Registras tipo de activo fijo</Card.Title>
              <Link className="nav-link" to='/registrartipodeactivo'>IR</Link>
            </Card.Body>
          </Card>
        </CardGroup>
      </div>
    </body>
  )
}