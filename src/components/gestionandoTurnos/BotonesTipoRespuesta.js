import React, {useContext} from 'react';
import {FormularioContext} from '../../context/contextFormulario'
import styled from 'styled-components'

const StyledBoxBotones = styled.button`
    justify-content:center;
    text-align:center;
    margin-bottom: 50px;
`
    




const BotonesTipoRespuesta = () => {

    const { tiporespuesta, setrespuestaSeleccionada, respuestaSeleccionada } = useContext(FormularioContext);

    const clickingBoton = (e) => {        
        
        setrespuestaSeleccionada(e.target.value)
        
    }

    const clickAtras = (e) =>{
        setrespuestaSeleccionada('')
    }

    return ( <>
        
    {respuestaSeleccionada ? <>
    
            <div className="mt-3 shadow border border-primary text-center">
            <h5 className='text-center text-warning'>Ha seleccionado: <strong className="text-white">{respuestaSeleccionada}</strong></h5>
            <button
                className='shadow btn btn-warning btn-sm mb-1 text-center' onClick={clickAtras}
            >Deshacer</button></div>    
        
        </>:<>
        <div className="justify-content-center">
        <h3 className='text-white'>Seleccione un Tipo de Respuesta: </h3>
        {tiporespuesta.map(resp=>
            <StyledBoxBotones 
            className="shadow btn btn-outline-success btn-sm my-1"
            onClick={clickingBoton}
            key={resp}
            value={resp}
            name='tipoResp'                             
        >{resp}</StyledBoxBotones> 
            )}
        </div>

        </>}
        


    </> );
}
 
export default BotonesTipoRespuesta;