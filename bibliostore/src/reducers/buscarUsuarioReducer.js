import {BUSCAR_USUARIO} from '../actions/types';

const initialState = {}

export default function(state = initialState, action) {
    switch (action.type) {
        case BUSCAR_USUARIO:
            return {
                ...state,
                nombre: action.usuario.Nombre,
                apellido: action.usuario.Apellido,
                codigo: action.usuario.Codigo,
                carrera: action.usuario.Carrera
            }
    
        default:
            return state;
    }
}