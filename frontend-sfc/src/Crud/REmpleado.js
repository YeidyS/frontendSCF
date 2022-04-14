import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Swal from "sweetalert2";
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from "reactstrap";
import { Link } from 'react-router-dom';
import { Form, FormControl } from "react-bootstrap";
import '../estilos/Crud.css';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const data = [
    { id: 1, nombre: "Jose", apellido: "Castillo", cedula: "40215055878", celular: "8095548778" },
    { id: 2, nombre: "Mario", apellido: "Mercedes", cedula: "1258622562", celular: "8296511232" },
];

class REmpleado extends React.Component {
    state = {
        data: [],
        form: { //Creadndo el estado del formulario 
            id: 0,
            nombre: '',
            apellido: '',
            cedula: '',
            celular: '',
            tipoModal: ''
        },
        modalInsertar: false,
        modalEditar: false,
    };

    URL = "https://web-api-project-activos-fijos.herokuapp.com/api/Empleado"

    peticionGet = () => {
        axios.get(this.URL).then(response => {
            this.setState({ data: response.data });
        }).catch(error => {
            console.log(error.message);
        })
    }

    peticionPost = async () => {
        delete this.state.form.id;
        await axios.post(this.URL, this.state.form).then(response => {
            this.modalInsertar();
            this.peticionGet();
            if (response.status === 201) {
                Swal.fire(
                    'Guardado!',
                    `El empleado ${ response.data.nombre} ha sido guardado exitosamente!`,
                    'success'
                )
            } else {    
                Swal.fire(
                    'Error!',
                    'Hubo un problema al crear el registro!',
                    'error'
                )
            }
        }).catch(error => {
            console.log(error.message);
        })
    }

    peticionPut = () => {
        axios.put(`${this.URL}/${this.state.form.id}`, this.state.form).then(response => {
            this.modalInsertar();
            this.peticionGet();
            if (response.status === 204) {
                Swal.fire(
                    'Actualizado!',
                    `El empleado ha sido actualizado  exitosamente!`,
                    'success'
                )
            } else {    
                Swal.fire(
                    'Error!',
                    'Hubo un problema al crear el registro!',
                    'error'
                )
            }
        }).catch(error => {
            console.log(error.message);
        })
    }

    modalInsertar = () => {
        this.setState({ modalInsertar: !this.state.modalInsertar });
    }


    peticionDelete = () => {
        axios.delete(`${this.URL}/${this.state.form.id}`).then(response => {
            this.setState({ modalEliminar: false });
            this.peticionGet();
            if (response.status === 204) {
                Swal.fire(
                    'Borrado!',
                    `El empleado ha sido borrado  exitosamente!`,
                    'success'
                )
            } else {    
                Swal.fire(
                    'Error!',
                    'Hubo un problema al crear el registro!',
                    'error'
                )
            }
        }).catch(error => {
            console.log(error.message);
        })
    }

    seleccionarEmpresa = (empleado) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                id: empleado.id,
                nombre: empleado.nombre,
                apellido: empleado.apellido,
                cedula: empleado.cedula,
                celular: empleado.celular,
            }
        })
    }


    handleChange = async e => {
        e.persist();
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.form);
    }

    componentDidMount() {
        this.peticionGet();
    }




    render() {
        const { form } = this.state;
        return (

            <div className="registrarempl">
                <br /><br /><br />
                <button className="btn btn-success insertarempelado" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }}>Agregar Empleado</button>
                <div align="right">
                        <ReactHTMLTableToExcel
                            className="btn btn-success exportar"
                            id="botonExportar"
                            table="tablasempl"
                            filename="Empleados"
                            sheet="Hoja 1"
                            buttonText="Exportar a Excel"
                        />
                    </div>

                <table className="table" id="tablasempl" >
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Cedula</th>
                            <th>Celular</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map(empresa => {
                            return (
                                <tr>
                                    <td>{empresa.id}</td>
                                    <td>{empresa.nombre}</td>
                                    <td>{empresa.apellido}</td>
                                    <td>{empresa.cedula}</td>
                                    <td>{empresa.celular}</td>
                                    <td>
                                        <i className="bi bi-pencil-square acciones editar" onClick={() => { this.seleccionarEmpresa(empresa); this.modalInsertar() }}></i>
                                        {"   "}
                                        <i className="bi bi-trash-fill acciones borrar" onClick={() => { this.seleccionarEmpresa(empresa); this.setState({ modalEliminar: true }) }}></i>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader style={{ display: 'block' }}>
                        <span style={{ float: 'right' }} onClick={() => this.modalInsertar()}>x</span>
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label htmlFor="id">ID</label>
                            <input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={form ? form.id : this.state.data.length + 1} />
                            <br />
                            <label htmlFor="nombre">Nombre</label>
                            <input className="form-control" type="text" name="nombre" id="nombre" onChange={this.handleChange} value={form ? form.nombre : ''} />
                            <br />
                            <label htmlFor="nombre">Apellido</label>
                            <input className="form-control" type="text" name="apellido" id="apellido" onChange={this.handleChange} value={form ? form.apellido : ''} />
                            <br />
                            <label htmlFor="nombre">Cedula</label>
                            <input className="form-control" type="text" name="cedula" id="cedula" onChange={this.handleChange} value={form ? form.cedula : ''} />
                            <br />
                            <label htmlFor="capital_bursatil">Celular</label>
                            <input className="form-control" type="text" name="celular" id="celular" onChange={this.handleChange} value={form ? form.celular : ''} />
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        {this.state.tipoModal == 'insertar' ?
                            <button className="btn btn-success" onClick={() => this.peticionPost()}>
                                Insertar
                            </button> : <button className="btn btn-primary" onClick={() => this.peticionPut()}>
                                Actualizar
                            </button>
                        }
                        <button className="btn btn-danger" onClick={() => this.modalInsertar()}>Cancelar</button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalEliminar}>
                    <ModalBody>
                        Estás seguro que deseas eliminar al empleado {form && form.nombre}
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-danger" onClick={() => this.peticionDelete()}>Sí</button>
                        <button className="btn btn-secundary" onClick={() => this.setState({ modalEliminar: false })}>No</button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default REmpleado;