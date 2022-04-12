import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from "reactstrap";
import { Link } from 'react-router-dom';
import {Form,FormControl} from "react-bootstrap";
import '../estilos/Crud.css';

const data = [
    { id: 1, codigo: "Jose", NTAFijo: "Castillo"},
    
];


class RTActivo extends React.Component {
    state = {
        data: data,
        form:{ //Creadndo el estado del formulario 
           id:'',
           codigo:'',
           NTAFijo:''
        },
        modalInsertar: false,
        modalEditar: false,
    };

    mostrarModalInsertar=()=>{ //Creando una funcio para cambiar el estado a true
        this.setState({modalInsertar:true});
    }

    ocultarModalInsertar=()=>{ //Creando una funcion para cerrar el modal
        this.setState({modalInsertar:false});
    }

    mostrarModalEditar=(registro)=>{ //Creando una funcio para cambiar el estado a true del modal editar 
        this.setState({modalEditar:true, form:registro}); //Le pasamos el registro para que la ventana modal de editar venga con los valores actueles del campo 
    }

    ocultarModaEditar=()=>{ //Creando una funcion para cerrar el modal editar
        this.setState({modalEditar:false});
    }
    render() {
        return (
            <>
                <div className="registraractivo">
                    <Container>
                        <br />
                        <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Insertar Tipo de Activo</Button>
                        <br /><br />

                        <Table>
                            <thead> 
                                <tr><th>Id</th>
                                    <th>Código</th>
                                    <th>Nombre del Tipo de Activo Fijo</th>
                                    <th>Acciones</th>
                                    </tr>
                            </thead>
                            <tbody>
                                {this.state.data.map((elemento) => (
                                    <tr>
                                        <td>{elemento.id}</td>
                                        <td>{elemento.codigo}</td>
                                        <td>{elemento.NTAFijo}</td>                   
                                        <td><Button color="primary" onClick={()=>this.mostrarModalEditar(elemento)}>Editar</Button>
                                        {"  "}<Button color="danger">Eliminar</Button></td>
                                    </tr>                                   
                                ))}
                            </tbody>
                        </Table>
                    </Container>
                </div>
                {/*CREANDO LA VENTANA MODAL PARA INSERTAR TIPO DE ACTIVOS*/}
                <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader>
                        <div><h3>Insertar Tipo de Activo</h3></div>
                    </ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <label>Id:</label>
                            <input className="form-control" readOnly type="number" value={this.state.data.length+1}/>
                        </FormGroup>

                        <FormGroup>
                            <label> Código:</label>
                            <select className="form-control" name="nombre" type="text" onChange={this.handleChange}/>
                        </FormGroup>

                        <FormGroup>
                            <label> Nombre del Tipo de Activo Fijo: </label>
                            <input className="form-control" name="apellido" type="text" onChange={this.handleChange}/>
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary"> Insertar</Button>
                        <Button color="danger" onClick={()=>this.ocultarModalInsertar()}>Cancelar</Button>  
                    </ModalFooter>
                </Modal>
                
                 {/*CREANDO LA VENTANA MODAL PARA EDITAR TIPO DE ACTIVOS*/}
                 <Modal isOpen={this.state.modalEditar}>
                    <ModalHeader>
                        <div><h3>Editar Tipo de Activo</h3></div>
                    </ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <label>Id:</label>
                            <input className="form-control" readOnly type="number" value={this.state.form.id}/>
                        </FormGroup>

                        <FormGroup>
                            <label> Código:</label>
                            <input className="form-control" name="nombre" type="text" onChange={this.handleChange} value={this.state.form.codigo}/>
                        </FormGroup>

                        <FormGroup>
                            <label> Nombre del Tipo Activo Fijo: </label>
                            <input className="form-control" name="apellido" type="text" onChange={this.handleChange} value={this.state.form.NTAFijo}/>
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" >Editar</Button>
                        <Button color="danger" onClick={()=>this.ocultarModaEditar()}>Cancelar</Button>  
                    </ModalFooter>
                </Modal>
            </>
        )
    }
}

export default RTActivo;