import React, {useContext} from 'react';
import {FormularioContext} from '../context/contextFormulario';

const BotonesTipoTurno = () => {

    const { tipoTurno, setdatosFormulario, datosFormulario, setturnoSeleccionado } = useContext(FormularioContext);

    const clickingBoton = (e) => {        
        
        setturnoSeleccionado(e.target.value)
        setdatosFormulario({
            ...datosFormulario,
            [e.target.name] : e.target.value,
            
        })
        
        //db.collection('datosturno').doc().set(datosFormulario) 
        
        
        
    }

    return ( <>
         {tipoTurno.map(tipo=>
            <button 
                className="btn btn-success my-1 mx-1"
                onClick={clickingBoton}
                value={tipo}
                name='tipoTurno'                             
            >{tipo}</button>    
        )}
    </> );
}
 
export default BotonesTipoTurno;