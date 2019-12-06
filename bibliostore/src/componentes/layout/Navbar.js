import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect} from 'react-redux-firebase';



class Navbar extends Component {
    state = {
        usuarioAutenticado : false
    }

    static getDerivedStateFromProps(props, state) {
        const {auth} = props;
        if(auth.uid){
            return { usuarioAutenticado : true}
        }
        else{
            return { usuarioAutenticado : false}
        }
    }


    // cerrar sesion
    cerrarSesion = ()=>{
        const {firebase} = this.props;
        firebase.logout();
    }

    //christsnchz@gmail.com
    //123456
    
    render() {

        const { usuarioAutenticado} = this.state;
        const {auth} = this.props;
        console.log(auth);

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
                <nav className="navbar navbar-light">
                    <span className="navbar-brand mb-0 h1">
                        Administrador de biblioteca
                </span>
                </nav>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor02">
                   {usuarioAutenticado ? (
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to={'/suscriptores'} className="nav-link">
                                    Suscriptores
                            </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/'} className="nav-link">
                                    Libros
                            </Link>
                            </li>
                        </ul>
                   ) : null }
                   { usuarioAutenticado ? (
                       <ul className="navbar-nav ml-auto">
                           <li className="nav-item">
                               <a href="#!" className="nav-link">
                                   { auth.email }
                               </a>
                           </li>

                           <li className="nav-item">
                               <button
                               type="button"
                               className="btn btn-danger"
                               onClick={this.cerrarSesion}
                               >
                                   Cerrar Sesion
                               </button>
                           </li>
                       </ul>
                   ) : null }

                </div>
            </nav>

        );
    }
}

export default compose(
    firebaseConnect(),
    connect((state,props) =>({
        auth: state.firebase.auth
    }))
)(Navbar);