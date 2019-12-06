import React, { Component } from 'react';
import {firebaseConnect} from 'react-redux-firebase';

class Login extends Component {
    state = { 
        email : '',
        password: ''
     }

     iniciarSesion = e =>{
         e.preventDefault();

         const {firebase} = this.props;
         const {email,password} = this.state;

         firebase.login({
             email,
             password
         }).then(resultado => {

         }).catch(error => {

         })
     }

     leerDato = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    render() { 
        return ( 
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card mt-5">
                        <div className="card-body">
                            <h2 className="text-center py-4">
                                <i className="fas fa-lock"> </i>{' '}
                                    Iniciar sesion
                            </h2>
                                <form
                                    onSubmit={this.iniciarSesion}
                                >
                                    <div className="form-group">
                                        <label >Email:</label>
                                        <input 
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            required
                                            value={this.state.email}
                                            onChange={this.leerDato}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label >Password:</label>
                                        <input 
                                            type="text"
                                            className="form-control"
                                            name="password"
                                            required
                                            value={this.state.password}
                                            onChange={this.leerDato}
                                        />
                                    </div>

                                    <input
                                        type ="submit"
                                        className="btn btn-success btn-block"
                                        value="Iniciar Sesion"
                                    />
                                </form>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default firebaseConnect() (Login);