import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from "reactstrap";
import { Link } from 'react-router-dom';
import '../estilos/Crud.css';

const data = [
    { id: 1, nombre: "Jose", apellido: "Castillo", cedula: "40215055878", celular: "8095548778" },
    { id: 2, nombre: "Mario", apellido: "Mercedes", cedula: "1258622562", celular: "8296511232" },
];

class REmpleado extends React.Component {
    state = {
        data: data,
        form:{ //Creadndo el estado del formulario 
           id:'',
           nombre:'',
           apellido:'',
           cedula:'', 
           calular:''
        },
        modalInsertar: false,
        
    };

    handleChange=e=>{
        this.setState({
            form:{
                ...this.state.form,
                [e.target.name]:e.target.value,
            }
        });
    }

    mostrarModalInsertar=()=>{ //Creando una funcio para cambiar el estado a true
        this.setState({modalInsertar:true});
    }

    ocultarModalInsertar=()=>{ //Creando una funcion para cerrar el modal
        this.setState({modalInsertar:false});
    }

    render() {
        return (
            <>
                <div className="registrarempl">
                    <Container>
                        <br />
                        <Button color="primary" onClick={()=>this.mostrarModalInsertar()}>Insertar Nuevo Empleado</Button>
                        <br /><br />

                        <Table>
                            <thead> 
                                <tr><th>Id</th>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Cedula</th>
                                    <th>Celular</th>
                                    <th>Acciones</th></tr>
                            </thead>
                            <tbody>
                                {this.state.data.map((elemento) => (
                                    <tr>
                                        <td>{elemento.id}</td>
                                        <td>{elemento.nombre}</td>
                                        <td>{elemento.apellido}</td>
                                        <td>{elemento.cedula}</td>
                                        <td>{elemento.celular}</td>
                                        <td><Button color="primary">Editar</Button>{"  "}<Button color="danger">Eliminar</Button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Container>
                </div>

                {/*CREANDO LA VENTANA MODAL PARA INSERTAR EMPELADOS*/}
                <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader>
                        <div><h3>Insertar Empleado</h3></div>
                    </ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <label>Id:</label>
                            <input className="form-control" readOnly type="text" value={this.state.data.length+1}/>
                        </FormGroup>

                        <FormGroup>
                            <label> Nombre:</label>
                            <input className="form-control" name="nombre" type="text" onChange={this.handleChange}/>
                        </FormGroup>

                        <FormGroup>
                            <label> Apellido: </label>
                            <input className="form-control" name="apellido" type="text"/>
                        </FormGroup>

                        <FormGroup>
                            <label> Cedula:</label>
                            <input className="form-control" name="cedula" type="number"/>
                        </FormGroup>

                        <FormGroup>
                            <label> Celular:</label>
                            <input className="form-control" name="celular" type="number"/>
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary"> Insertar</Button>
                        <Button color="danger" onClick={()=>this.ocultarModalInsertar()}>Cancelar</Button>  
                    </ModalFooter>
                </Modal>
            </>
        )
    }
}

export default REmpleado;