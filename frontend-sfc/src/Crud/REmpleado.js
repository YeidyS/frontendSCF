import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from "reactstrap";
import { Link } from 'react-router-dom';
import {Form,FormControl} from "react-bootstrap";
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
        modalEditar: false,
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
    inertarEmpleado=()=>{ //Creando funcion para insertar un nuevo empelado
        let valorNuevo = {...this.state.form};
        valorNuevo.id = this.state.data.length+1;
        var lista=this.state.data;
        lista.push(valorNuevo);
        this.setState({data: lista, modalInsertar:false});
    }

    mostrarModalEditar=(registro)=>{ //Creando una funcio para cambiar el estado a true del modal editar 
        this.setState({modalEditar:true, form:registro}); //Le pasamos el registro para que la ventana modal de editar venga con los valores actueles del campo 
    }

    ocultarModaEditar=()=>{ //Creando una funcion para cerrar el modal editar
        this.setState({modalEditar:false});
    }

    editarEmpleado=(dato)=>{
        let contador = 0;
        let lista = this.state.data;
        lista.map((registro)=>{
            if(dato.id == registro.id){
                lista[contador].nombre=dato.nombre;
                lista[contador].apellido=dato.apellido;
                lista[contador].cedula=dato.cedula;
                lista[contador].celular=dato.celular;
            }
            contador++;
        });
        this.setState({data: lista, modalEditar: false}); //Actuelizando nuestra lista 
    }

    eliminarEmpleado = (dato)=>{
        let opcion =window.confirm("Realmente desea eliminar el registro"+dato.id)
        if(opcion){
            let contador = 0; 
            let lista = this.state.data;
            lista.map((registro)=>{
                if(registro.id==dato.id){
                    lista.splice(contador,1)
                }
                contador++;
            })
            this.setState({data:lista});
        }
    }
    render() {
        return (
            <>
                <div className="registrarempl">
                    <Container>
                        <br />
                        <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Insertar Nuevo Empleado</Button>
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
                                        <td>{elemento.celular}</td>          {/*Llamando la funcion para mostrar el modal editar*/}
                                        <td><Button color="primary" onClick={()=>this.mostrarModalEditar(elemento)}>Editar</Button>
                                        {"  "}<Button color="danger" onClick={()=>this.eliminarEmpleado(elemento)}>Eliminar</Button></td>
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
                            <input className="form-control" readOnly type="number" value={this.state.data.length+1}/>
                        </FormGroup>

                        <FormGroup>
                            <label> Nombre:</label>
                            <input className="form-control" name="nombre" type="text" onChange={this.handleChange}/>
                        </FormGroup>

                        <FormGroup>
                            <label> Apellido: </label>
                            <input className="form-control" name="apellido" type="text" onChange={this.handleChange}/>
                        </FormGroup>

                        <FormGroup>
                            <label> Cedula:</label>
                            <input className="form-control" name="cedula" type="number" onChange={this.handleChange}/>
                        </FormGroup>

                        <FormGroup>
                            <label> Celular:</label>
                            <input className="form-control" name="celular" type="number" onChange={this.handleChange}/>
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={()=>this.inertarEmpleado()}> Insertar</Button>
                        <Button color="danger" onClick={()=>this.ocultarModalInsertar()}>Cancelar</Button>  
                    </ModalFooter>
                </Modal>

                 {/*CREANDO LA VENTANA MODAL PARA EDITAR EMPLEADOS*/}

                 <Modal isOpen={this.state.modalEditar}>
                    <ModalHeader>
                        <div><h3>Editar Empleado</h3></div>
                    </ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <label>Id:</label>
                            <input className="form-control" readOnly type="number" value={this.state.form.id}/>
                        </FormGroup>

                        <FormGroup>
                            <label> Nombre:</label>
                            <input className="form-control" name="nombre" type="text" onChange={this.handleChange} value={this.state.form.nombre}/>
                        </FormGroup>

                        <FormGroup>
                            <label> Apellido: </label>
                            <input className="form-control" name="apellido" type="text" onChange={this.handleChange} value={this.state.form.apellido}/>
                        </FormGroup>

                        <FormGroup>
                            <label> Cedula:</label>
                            <input className="form-control" name="cedula" type="number" onChange={this.handleChange} value={this.state.form.cedula}/>
                        </FormGroup>

                        <FormGroup>
                            <label> Celular:</label>
                            <input className="form-control" name="celular" type="number" onChange={this.handleChange} value={this.state.form.celular}/>
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={()=>this.editarEmpleado(this.state.form)}>Editar</Button>
                        <Button color="danger" onClick={()=>this.ocultarModaEditar()}>Cancelar</Button>  
                    </ModalFooter>              {/*Llamando el metodo para cerrar el modal editar */}
                </Modal>
            </>
        )
    }
}

export default REmpleado;