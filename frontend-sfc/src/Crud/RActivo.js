import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from "reactstrap";
import { Link } from 'react-router-dom';
import axios from 'axios'
import { Form, FormControl } from "react-bootstrap";
import '../estilos/Crud.css';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const data = [
    { id: 1, NTActivo: "Jose", MEquipo: "Castillo", DActivo: "dcdscsdvcds", FAdquisicion: "02/02/02", NRContable: "5450dsd", AUsuaria: "Para trasnporte", CAdquisicion: "8455555555", VNeto: "55465654", EActual: "Activo" },
];



class RActivo extends React.Component {
    state = {
        data: data,
        form: { //Creadndo el estado del formulario 
            id: 0,
            modeloEquipo: '',
            descripcionActivo: '',
            fechaAdquisicion: Date.now(),
            numRegistro: 0,
            areaUsuaria: '',
            costoAdquisicion: 0,
            valorNeto: 0,
            estado: true,
            codigoTipoActivo: ''
        },
        modalInsertar: false,
        modalEditar: false,
    };

    URL = "https://web-api-project-activos-fijos.herokuapp.com/api/ActivoFijo"

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
                    `El activo ha sido actualizado  exitosamente!`,
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
                    `El activo ha sido borrado  exitosamente!`,
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

    seleccionarEmpresa = (Activo) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                id: Activo.id,
                modeloEquipo: Activo.modeloEquipo,
                descripcionActivo: Activo.descripcionActivo,
                fechaAdquisicion: Activo.fechaAdquisicion,
                numRegistro: Activo.numRegistro,
                areaUsuaria: Activo.areaUsuaria,
                costoAdquisicion: Activo.costoAdquisicion,
                valorNeto: Activo.valorNeto,
                estado: Activo.estado,
                codigoTipoActivo: Activo.codigoTipoActivo
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
                    <button className="btn btn-success insertaractivo" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }}>Agregar Activo</button>
                    <div align="right">
                        <ReactHTMLTableToExcel
                            className="btn btn-success exportar"
                            id="botonExportar"
                            table="tablas"
                            filename="Activosfijos"
                            sheet="Hoja 1"
                            buttonText="Exportar a Excel"
                        />
                    </div>

                    <table className="table" id="tablas">
                        <thead>
                            <tr><th>Id</th>
                                <th>ModeloEquipo</th>
                                <th>DescripcionActivo</th>
                                <th>FechaAdquisicion</th>
                                <th>NumRegistro</th>
                                <th>A.Usuaria</th>
                                <th>CostoAdquisicion</th>
                                <th>ValorNeto</th>
                                <th>Estado</th>
                                <th>CodigoTipoActivo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map(Activo => {
                                return (
                                    <tr>
                                        <td>{Activo.id}</td>
                                        <td>{Activo.modeloEquipo}</td>
                                        <td>{Activo.descripcionActivo}</td>
                                        <td>{Activo.fechaAdquisicion}</td>
                                        <td>{Activo.numRegistro}</td>
                                        <td>{Activo.areaUsuaria}</td>
                                        <td>{Activo.costoAdquisicion}</td>
                                        <td>{Activo.valorNeto}</td>
                                        <td>{Activo.estado}</td>
                                        <td>{Activo.codigoTipoActivo}</td>
                                        <td>
                                            <i className="bi bi-pencil-square acciones editar" onClick={() => { this.seleccionarEmpresa(Activo); this.modalInsertar() }}></i>
                                            {"   "}
                                            <i className="bi bi-trash-fill acciones borrar" onClick={() => { this.seleccionarEmpresa(Activo); this.setState({ modalEliminar: true }) }}></i>
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
                                <label htmlFor="nombre">Modelo Equipo</label>
                                <input className="form-control" name="modeloEquipo" id="modeloEquipo" type="text" onChange={this.handleChange} value={form ? form.modeloEquipo : ''} />
                                <br />
                                <label htmlFor="nombre">Descripcion Activo</label>
                                <input className="form-control" name="descripcionActivo" id="descripcionActivo" type="text" onChange={this.handleChange} value={form ? form.descripcionActivo : ''} />
                                <br />
                                <label htmlFor="nombre">Fecha Adquisicion</label>
                                <input className="form-control" name="fechaAdquisicion" id="fechaAdquisicion" type="date" onChange={this.handleChange} value={form ? form.fechaAdquisicion : Date.now()} />
                                <br />
                                <label htmlFor="nombre">Num Registro</label>
                                <input className="form-control" name="NumRegistro" id="NumRegistro" type="number" onChange={this.handleChange} value={form ? form.numRegistro : 0} />
                                <br />
                                <label htmlFor="nombre">Area Usuaria</label>
                                <input className="form-control" name="areaUsuaria" id="areaUsuaria" type="text" onChange={this.handleChange} value={form ? form.areaUsuaria : ''} />
                                <br />
                                <label htmlFor="nombre">Costo de Adquisicion</label>
                                <input className="form-control" name="costoAdquisicion" id="costoAdquisicion" type="number" onChange={this.handleChange} value={form ? form.numRegistro : 0} />
                                <br />
                                <label htmlFor="nombre">Valor Neto</label>
                                <input className="form-control" name="valorNeto" id="valorNeto" type="number" onChange={this.handleChange} value={form ? form.valorNeto : 0} />
                                <br />
                                <label htmlFor="nombre">Estado</label>
                                <div class="form-check">
                                    <input class="form-check-input" name="estado" type="checkbox" id="estado" onChange={this.handleChange} value={form ? form.estado : 'true'} />
                                    <label class="form-check-label" for="true">
                                        Activo
                                    </label>
                                </div>
                                <br />
                                <label htmlFor="nombre">Codigo Tipo Activo</label>
                                <input className="form-control" name="codigoTipoActivo" id="codigoTipoActivo" type="text" onChange={this.handleChange} value={form ? form.codigoTipoActivo : ''} />
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
                            Estás seguro que deseas eliminar el activo {form && form.nombre}
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

export default RActivo;