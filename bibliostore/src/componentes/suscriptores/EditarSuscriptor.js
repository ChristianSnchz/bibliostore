import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from "react-redux";
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';

class EditarSuscriptor extends Component {

    nombreInput = React.createRef();
    apellidoInput = React.createRef();
    carreraInput = React.createRef();
    codigoInput = React.createRef();

    editarSuscriptor = e =>{
        e.preventDefault();

        const suscriptorActualizado = {
            Nombre : this.nombreInput.current.value,
            Apellido : this.apellidoInput.current.value,
            Carrera : this.carreraInput.current.value,
            Codigo : this.codigoInput.current.value
        }

        const {suscriptor , firestore , history} = this.props;

        firestore.update(
        {
           collection : 'suscriptores',
           doc: suscriptor.id
        },suscriptorActualizado)
        .then(history.push('/suscriptores'));

    }


    render() {

        const { suscriptor } = this.props;

        if (!suscriptor) return <Spinner />

        return (
            <div className="row">
                <div className="col-12 mb-4">
                    <Link to={'/suscriptores'} className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i>{' '}
                        Volver al Listado
                </Link>
                </div>
                <div className="col-12">
                    <h2>
                        <i className="fas fas-user"></i>{' '}
                        Editar Suscriptor
                </h2>

                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                            <form
                                onSubmit={this.editarSuscriptor}
                            >
                                <div className="form-gruop">
                                    <label >Nombre:</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="Nombre"
                                        placeholder="Nombre del suscriptor"
                                        required
                                        ref={this.nombreInput}
                                        defaultValue={suscriptor.Nombre}
                                    />
                                </div>

                                <div className="form-gruop">
                                    <label >Apellido:</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="Apellido"
                                        placeholder="Apellido del suscriptor"
                                        required
                                        ref={this.apellidoInput}
                                        defaultValue={suscriptor.Apellido}
                                    />
                                </div>

                                <div className="form-gruop">
                                    <label >Carrera:</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="Carrera"
                                        placeholder="Carrera del suscriptor"
                                        required
                                        ref={this.carreraInput}
                                        defaultValue={suscriptor.Carrera}
                                    />
                                </div>

                                <div className="form-gruop">
                                    <label >Codigo:</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="Codigo"
                                        placeholder="Codigo del suscriptor"
                                        required
                                        ref={this.codigoInput}
                                        defaultValue={suscriptor.Codigo}
                                    />
                                </div>

                                <input
                                    type="submit"
                                    value="Editar suscriptor"
                                    className="btn btn-success mt-2"
                                />
                            </form>
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
            collection: 'suscriptores',
            storeAs: 'suscriptor',
            doc: props.match.params.id
        }
    ]),
    connect(({ firestore: { ordered } }, props) => ({
        suscriptor: ordered.suscriptor && ordered.suscriptor[0]
    }))
)(EditarSuscriptor);