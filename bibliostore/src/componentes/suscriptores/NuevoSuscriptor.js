import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {firestoreConnect} from 'react-redux-firebase';

class NuevoSuscriptor extends Component {
    state = { 
        Nombre: '',
        Apellido: '',
        Carrera: '',
        Codigo: ''
     }

     //agregar suscriptor
     agregarSuscriptor = e =>{
         e.preventDefault();

         const nuevoSuscriptor = this.state;

         const { firestore, history } = this.props;

         firestore.add({collection: 'suscriptores',},nuevoSuscriptor )
         .then(() => history.push('/suscriptores'))
 
     }

     //extraer los valores del input y pal state
    leerDato = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render() { 
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
                       <i className="fas fas-user-plus"></i>{' '} 
                       Nuevo Suscriptor
                    </h2>

                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                            <form
                                onSubmit={this.agregarSuscriptor}
                            >
                                <div className="form-gruop">
                                    <label >Nombre:</label>
                                    <input 
                                        className="form-control"
                                        type="text"
                                        name="Nombre"
                                        placeholder="Nombre del suscriptor"
                                        required
                                        onChange={this.leerDato}
                                        value={this.state.Nombre}
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
                                        onChange={this.leerDato}
                                        value={this.state.Apellido}
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
                                        onChange={this.leerDato}
                                        value={this.state.Carrera}
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
                                        onChange={this.leerDato}
                                        value={this.state.Codigo}
                                        />
                                </div>

                                <input
                                    type ="submit"
                                    value ="Agregar suscriptor"
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
 
export default firestoreConnect()(NuevoSuscriptor);