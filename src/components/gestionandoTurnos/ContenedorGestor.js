import React from 'react'
import FormularioProvider from '../../context/contextGestor';
import GestionTurnos from './GestionTurnos';

const ContenedorGestor = () => {
    return ( <>
    <GestorProvider>
        <GestionTurnos/>
    </GestorProvider>
    </> );
}
 
export default ContenedorGestor;