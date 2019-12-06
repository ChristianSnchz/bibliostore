import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from "react-redux";
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import Ficha from '../suscriptores/Ficha';


import {buscarUsuario} from '../../actions/buscarUsuarioActions';

class PrestamoLibro extends Component {
    state = {
        busqueda: '',
        noResultados : false
    }

    buscarAlumno = e => {
        e.preventDefault();

        const { busqueda } = this.state;

        const { firestore , buscarUsuario } = this.props;

        const coleccion = firestore.collection('suscriptores');
        const consulta = coleccion.where("Codigo", "==", busqueda).get();

        consulta.then(resultado => {
            if (resultado.empty) {

                buscarUsuario({})
                this.setState({
                    noResultados: true
                })
            }
            else {
                const datos = resultado.docs[0];
                buscarUsuario(datos.data());
                this.setState({
                    noResultados: false
                })
            }
        })
    }

    solicitarPrestamo = () =>{
        const {usuario} = this.props;

        usuario.fecha_solicitud = new Date().toLocaleDateString();
        //no se pueden mutar los props
        let prestados = [];
        prestados = [...this.props.libro.prestados,usuario];

        //copiar el obj y agregar los prestados 

        const libro = {...this.props.libro};
        
        delete libro.prestados;

        libro.prestados = prestados;

        const {firestore,history} = this.props;

        firestore.update({
            collection: 'libros',
            doc: libro.id
        },libro).then(history.push('/'));
    }


    leerDato = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {

        const { libro } = this.props;

        if (!libro) return <Spinner />

        const { usuario } = this.props;

        let fichaAlumno, btnSolicitar;
        if (usuario.nombre) {
            fichaAlumno = <Ficha
                                alumno={usuario}
                            />
             btnSolicitar = <button
                            type="button"
                            className="btn btn-primary btn-block"
                            onClick={this.solicitarPrestamo}
                        >Solicitar Prestamo
                         </button>
        }
        else{
            fichaAlumno = null;
            btnSolicitar = null;
        }
        console.log(this.props);

        const {noResultados} = this.state;
        let mensajeResultado = '';
        if(noResultados) {
            mensajeResultado = <div className="alert alert-danger">
                    No hay resultados para ese codigo.
                 </div>
        }
        else{
            mensajeResultado = null;
        }

        return (
            <div className="row">
                <div className="col-12 mb-4">
                    <Link to={'/'} className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i>{' '}
                        Volver al Listado
                    </Link>
                </div>
                <div className="col-12 mb-4">
                    <h2>
                        <i className="fas fas-book"></i>{' '}
                        Solicitar prestamo : {this.titulo}
                    </h2>

                    <div className="row justify-content-center mt-5">
                        <div className="col-md-8">
                            <form
                                onSubmit={this.buscarAlumno}
                                className="mb-4"
                            >
                                <legend className="color-primary text-center">
                                    Busca el suscriptor por codigo
                                </legend>

                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="busqueda"
                                        className="form-control"
                                        onChange={this.leerDato}
                                    />
                                </div>
                                <input value="Buscar Alumno" type="submit" className="btn btn-success btn-block" />

                            </form>

                            {fichaAlumno}
                            {btnSolicitar}

                            {mensajeResultado}
                        </div>
                    </div>

                </div>
            </div>

        );
    }
}

export default compose(
    firestoreConnect(props => [
        {
            collection: 'libros',
            storeAs: 'libro',
            doc: props.match.params.id
        }
    ]),
    connect(({ firestore: { ordered }, usuario }, props) => ({
        libro: ordered.libro && ordered.libro[0],
        usuario: usuario
    }), {buscarUsuario})
)(PrestamoLibro);