import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from "react-redux";
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';

class Editarlibro extends Component {
    state = {}
    tituloInput = React.createRef();
    existenciaInput = React.createRef();
    editorialInput = React.createRef();
    isbnInput = React.createRef();

    editarLibro = e =>{
        e.preventDefault();

        const libroActualizado = {
            titulo : this.tituloInput.current.value,
            editorial : this.editorialInput.current.value,
            existencia : this.existenciaInput.current.value,
            isbn : this.isbnInput.current.value
        }

        const {libro , firestore , history} = this.props;

        firestore.update(
        {
           collection : 'libros',
           doc: libro.id
        },libroActualizado)
        .then(history.push('/'));

    }

    render() {

        const { libro } = this.props;

        if (!libro) return <Spinner />


        return (
            <div className="row">
                <div className="col-12 mb-4">
                    <Link to={'/'} className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i>{' '}
                        Volver al Listado
                    </Link>
                </div>
                <div className="col-12">
                    <h2>
                        <i className="fas fas-book"></i>{' '}
                        Editar Libro
                    </h2>
                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                        <form
                                onSubmit={this.editarLibro}
                            >
                                <div className="form-group">
                                    <label>Titulo:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="titulo"
                                        placeholder="Titulo o nombre del libro"
                                        required
                                        defaultValue={libro.titulo}
                                        ref={this.tituloInput}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Editorial:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="editorial"
                                        placeholder="Editorial del libro"
                                        required
                                        defaultValue={libro.editorial}
                                        ref={this.editorialInput}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>ISBN:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="isbn"
                                        placeholder="ISBN del libro"
                                        required
                                        defaultValue={libro.isbn}
                                        ref={this.isbnInput}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Existencia:</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="existencia"
                                        placeholder="Existencia del libro"
                                        required
                                        defaultValue={libro.existencia}
                                        ref={this.existenciaInput}
                                    />
                                </div>
                            
                                <input 
                                    type="submit"
                                    value="Editar Libro"
                                    className="btn btn-success"
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
            collection: 'libros',
            storeAs: 'libro',
            doc: props.match.params.id
        }
    ]),
    connect(({ firestore: { ordered } }, props) => ({
        libro: ordered.libro && ordered.libro[0]
    }))
)(Editarlibro);