import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {CardGroup,Card,Button,Container,Form,Row,Col} from "react-bootstrap";
import img from '../img/logoCND.png'
import '../estilos/login.css'
import {Link} from 'react-router-dom';
import App from "../App";
import {Routes, Route} from "react-router-dom"; 

class ILogin extends React.Component {
    render(){
        return (
            <> 
     
             <div className="contlogin" >
                <Container className="mt-5" >
                    <Row className="row-2">
                        <Col lg={4} md={6} sm={12} className="text-logo">
                            <div><i className="bi bi-backspace-fill"></i></div>
                            <img className="imglog" src={img} alt="" />
                            <p className="p">Ingresa tus datos!</p>
                            <Form className="form-l">
                                <Form.Group className="labels">
                                    <Form.Control className="leib" type="email" placeholder="Escribe tu Email"></Form.Control>
                                </Form.Group>

                                <Form.Group className="labels">
                                    <Form.Control className="leib" type="password" placeholder="Escribe tu contraseña"></Form.Control>
                                </Form.Group>
                                <Link className="nav-link" to='/'><Button className="boton-1" variant="primary btn-block">Iniciar Sección</Button></Link>
                                
                                <Button className="boton-1" variant="primary btn-block" >Registrate</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
                </div>
            
            </>

        )
    }
}

export default ILogin;