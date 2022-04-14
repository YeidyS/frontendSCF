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
    { id: 1, codigo: "Jose", NTAFijo: "Castillo" },

];

class RTActivo extends React.Component {
    state = {
        data: [],
        form: { //Creadndo el estado del formulario 
            id: 0,
            codigo: '',
            numeroActivofijo: ''
        },
        modalInsertar: false,
        modalEditar: false,
    };

    URL = "https://web-api-project-activos-fijos.herokuapp.com/api/TipoActivo"

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
                    ` El registro ${response.data.codigo} ha sido guardado exitosamente!`,
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
                    `El tipo de activo ha sido actualizado  exitosamente!`,
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
                    `El tipo de activo ha sido borrado  exitosamente!`,
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

    seleccionarEmpresa = (tipoActivo) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                id: tipoActivo.id,
                codigo: tipoActivo.codigo,
                numeroActivofijo: tipoActivo.numeroActivofijo
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
            <>

                <div className="registraractivo">

                    <br /><br /><br />
                    <button className="btn btn-success registrartipoactivo" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }}>Agregar Tipo de Activo</button>
                    <div align="right">
                        <ReactHTMLTableToExcel
                            className="btn btn-success exportar"
                            id="botonExportar"
                            table="tablastipoactivo"
                            filename="TipoActivoFijo"
                            sheet="Hoja 1"
                            buttonText="Exportar a Excel"
                        />
                    </div>

                    <table className="table" id="tablastipoactivo">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Codigo</th>
                                <th>Tipo de Activo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map(tipoActivo => {
                                return (
                                    <tr>
                                        <td>{tipoActivo.id}</td>
                                        <td>{tipoActivo.codigo}</td>
                                        <td>{tipoActivo.numeroActivofijo}</td>
                                        <td>
                                            <i className="bi bi-pencil-square acciones editar" onClick={() => { this.seleccionarEmpresa(tipoActivo); this.modalInsertar() }}></i>
                                            {"   "}
                                            <i className="bi bi-trash-fill acciones borrar" onClick={() => { this.seleccionarEmpresa(tipoActivo); this.setState({ modalEliminar: true }) }}></i>
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
                                <input className="form-control" type="number" name="id" id="id" readOnly onChange={this.handleChange} value={form ? form.id : this.state.data.length + 1} />
                                <br />
                                <label htmlFor="nombre">Codigo</label>
                                <input className="form-control" type="text" name="codigo" id="codigo" onChange={this.handleChange} value={form ? form.codigo : ''} />
                                <br />
                                <label htmlFor="nombre">Tipo de Activo</label>
                                <input className="form-control" type="text" name="numeroActivofijo" id="numeroActivofijo" onChange={this.handleChange} value={form ? form.numeroActivofijo : ''} />
                                <br />
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
                            Estás seguro que deseas eliminar el tipo de activo {form && form.nombre}
                        </ModalBody>
                        <ModalFooter>
                            <button className="btn btn-danger" onClick={() => this.peticionDelete()}>Sí</button>
                            <button className="btn btn-secundary" onClick={() => this.setState({ modalEliminar: false })}>No</button>
                        </ModalFooter>
                    </Modal>

                </div>
            </>
        )
    }
}

export default RTActivo;