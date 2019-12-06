import {createStore,combineReducers,compose} from 'redux';
import {reactReduxFirebase , firebaseReducer} from 'react-redux-firebase'; 
import {reduxFirestore, firestoreReducer } from 'redux-firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


//custon reducers

import buscarUsuarioReducer from './reducers/buscarUsuarioReducer';

// configurar firestore

const firebaseConfig = {
    apiKey: "AIzaSyB8qJBXp-ENzLd9bXrH3I4ojzXBMiEKFJc",
    authDomain: "bibliostore-c711a.firebaseapp.com",
    databaseURL: "https://bibliostore-c711a.firebaseio.com",
    projectId: "bibliostore-c711a",
    storageBucket: "bibliostore-c711a.appspot.com",
    messagingSenderId: "635498772101",
    appId: "1:635498772101:web:ae5a97c5a5ed7f29525bec",
    measurementId: "G-BVRKDBBD6V"
}

// inicializar firebase

firebase.initializeApp(firebaseConfig);

//configuracion de react redux

const rrfConfig = {
    userProfile : 'users',
    useFirestoreForProfile : true
}

// crear el enhacer con compose de reduz y firestore

const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
)(createStore);

//reducers

const rootReducer = combineReducers({
    firebase : firebaseReducer,
    firestore: firestoreReducer,
    usuario : buscarUsuarioReducer
})

//state inicial 

const initialState = {};

//crear el store
const store = createStoreWithFirebase(rootReducer,initialState,compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ 
    && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;