import React from "react";
import imgregist from "../img/imgregistro.png"
import imgempleado from "../img/imgempleado.png"
import imgtipoact from "../img/imgtipoact.png"
import 'bootstrap/dist/css/bootstrap.min.css';
import {CardGroup,Card} from "react-bootstrap";
import '../estilos/home.css';
import {Link} from 'react-router-dom';

export default function Bootstrap(){
    return (
        <body className='cuerpo'>
            <div className="bodycard">
        <CardGroup>
        <Card className="card" border="secondary" style={{ width: '18rem' }}>
          <Card.Img variant="top" src={imgregist} />
          <Card.Body>
            <Card.Title>Registrar Activo</Card.Title>
            <Card.Link href="#">IR</Card.Link>
          </Card.Body>
        </Card>
        <Card className="card" border="secondary" style={{ width: '18rem' }}>
        <Link className="nav-link" to='/registrarempleado'><Card.Img variant="top" src={imgempleado} /></Link>
          <Card.Body>
            <Card.Title>Registrar Empleado</Card.Title>
            <Link className="nav-link" to='/registrarempleado'>IR</Link>
          </Card.Body>
        </Card>
        <Card border="secondary" style={{ width: '18rem' }}> 
          <Card.Img variant="top" src={imgtipoact} />
          <Card.Body>
            <Card.Title>Registras tipo de activo fijo</Card.Title>
            <Card.Link href="#">IR</Card.Link>
          </Card.Body>
        </Card>
      </CardGroup>
      </div>
      </body>
  )
}