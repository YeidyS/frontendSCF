import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from "reactstrap";
import { Link } from 'react-router-dom';
import {Form,FormControl} from "react-bootstrap";
import '../estilos/Crud.css';

const data = [
    { id: 1, NTActivo: "Jose", MEquipo: "Castillo", DActivo: "dcdscsdvcds", FAdquisicion: "02/02/02", NRContable:"5450dsd",AUsuaria:"Para trasnporte",CAdquisicion:"8455555555",VNeto:"55465654", EActual:"Activo"}, 
];

class RActivo extends React.Component {
    state = {
        data: data,
        form:{ //Creadndo el estado del formulario 
           id:'',
           NTActivo:'',
           MEquipo:'',
           DActivo:'',
           FAdquisicion:'', 
           NRContable:'',
           AUsuaria: '',
           CAdquisicion: '',
           VNeto: '',
           EActual:''
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
                        <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Insertar Activo</Button>
                        <Form className="d-flex">
                            <FormControl type="search" placeholder="Search" className="me-2" aria-label="Search"/>
                            <Button variant="outline-success">Search</Button>
                        </Form>
                        <br /><br />

                        <Table>
                            <thead> 
                                <tr><th>Id</th>
                                    <th>N.T.Activo</th>
                                    <th>M.Equipo</th>
                                    <th>D.Activo</th>
                                    <th>F.Adquisicion</th>
                                    <th>N.R.Contable</th>
                                    <th>A.Usuaria</th>
                                    <th>C.Adquisicion</th>
                                    <th>V.Neto</th>
                                    <th>E.Actual</th>
                                    <th>Acciones</th>
                                    </tr>
                            </thead>
                            <tbody>
                                {this.state.data.map((elemento) => (
                                    <tr>
                                        <td>{elemento.id}</td>
                                        <td>{elemento.NTActivo}</td>
                                        <td>{elemento.MEquipo}</td>
                                        <td>{elemento.DActivo}</td>
                                        <td>{elemento.FAdquisicion}</td>
                                        <td>{elemento.NRContable}</td>
                                        <td>{elemento.AUsuaria}</td>          
                                        <td>{elemento.CAdquisicion}</td>          
                                        <td>{elemento.VNeto}</td>          
                                        <td>{elemento.EActual}</td>                    
                                        <td><Button color="primary" onClick={()=>this.mostrarModalEditar(elemento)}>Editar</Button>
                                        {"  "}<Button color="danger">Eliminar</Button></td>
                                    </tr>                                   
                                ))}
                            </tbody>
                        </Table>
                    </Container>
                </div>
                {/*CREANDO LA VENTANA MODAL PARA INSERTAR ACTIVOS*/}
                <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader>
                        <div><h3>Insertar Activo</h3></div>
                    </ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <label>Id:</label>
                            <input className="form-control" readOnly type="number" value={this.state.data.length+1}/>
                        </FormGroup>

                        <FormGroup>
                            <label> Nombre Tipo Activo Fijo:</label>
                            <select className="form-control" name="nombre" type="text" onChange={this.handleChange}/>
                        </FormGroup>

                        <FormGroup>
                            <label> Modelo de Equipo: </label>
                            <input className="form-control" name="apellido" type="text" onChange={this.handleChange}/>
                        </FormGroup>
                        
                        <FormGroup>
                            <label> Fecha de Adquición:</label>
                            <input className="form-control" name="cedula" type="date" onChange={this.handleChange}/>
                        </FormGroup>

                        <FormGroup>
                            <label> Descripcion del activo:</label>
                            <input className="form-control" name="cedula" type="text" onChange={this.handleChange}/>
                        </FormGroup>

                        <FormGroup>
                            <label> Num.Registro Contable:</label>
                            <input className="form-control" name="celular" type="number" onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <label> Area de Usuaria:</label>
                            <input className="form-control" name="celular" type="text" onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <label> Costo de Adquisición:</label>
                            <input className="form-control" name="celular" type="number" onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <label> Valor Neto:</label>
                            <input className="form-control" name="celular" type="number" onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <label> Estado Actual:</label>
                            <select className="form-control" name="celular" type="text" onChange={this.handleChange}/>
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary"> Insertar</Button>
                        <Button color="danger" onClick={()=>this.ocultarModalInsertar()}>Cancelar</Button>  
                    </ModalFooter>
                </Modal>
                
                 {/*CREANDO LA VENTANA MODAL PARA EDITAR ACTIVOS*/}
                 <Modal isOpen={this.state.modalEditar}>
                    <ModalHeader>
                        <div><h3>Editar Activo</h3></div>
                    </ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <label>Id:</label>
                            <input className="form-control" readOnly type="number" value={this.state.form.id}/>
                        </FormGroup>

                        <FormGroup>
                            <label> Nombre Tipo Activo Fijo:</label>
                            <select className="form-control" name="nombre" type="text" onChange={this.handleChange} value={this.state.form.NTActivo}/>
                        </FormGroup>

                        <FormGroup>
                            <label> Modelo de Equipo: </label>
                            <input className="form-control" name="apellido" type="text" onChange={this.handleChange} value={this.state.form.MEquipo}/>
                        </FormGroup>
                        
                        <FormGroup>
                            <label> Fecha de Adquición:</label>
                            <input className="form-control" name="cedula" type="date" onChange={this.handleChange} value={this.state.form.FAdquisicion}/>
                        </FormGroup>

                        <FormGroup>
                            <label> Descripcion del activo:</label>
                            <input className="form-control" name="cedula" type="text" onChange={this.handleChange} value={this.state.form.DActivo}/>
                        </FormGroup>

                        <FormGroup>
                            <label> Num.Registro Contable:</label>
                            <input className="form-control" name="celular" type="number" onChange={this.handleChange} value={this.state.form.NRContable}/>
                        </FormGroup>
                        <FormGroup>
                            <label> Area de Usuaria:</label>
                            <input className="form-control" name="celular" type="text" onChange={this.handleChange} value={this.state.form.AUsuaria}/>
                        </FormGroup>
                        <FormGroup>
                            <label> Costo de Adquisición:</label>
                            <input className="form-control" name="celular" type="number" onChange={this.handleChange} value={this.state.form.CAdquisicion}/>
                        </FormGroup>
                        <FormGroup>
                            <label> Valor Neto:</label>
                            <input className="form-control" name="celular" type="number" onChange={this.handleChange} value={this.state.form.VNeto}/>
                        </FormGroup>
                        <FormGroup>
                            <label> Estado Actual:</label>
                            <select className="form-control" name="celular" type="text" onChange={this.handleChange} value={this.state.form.EActual}/>
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

export default RActivo;