import React, {useContext} from 'react';
import {FormularioContext} from '../context/contextFormulario';

const Bienvenida = () => {

    const {  setpaginador } = useContext(FormularioContext);

    const submitBienvenida=()=>{
        setpaginador(1)

    }

    return ( <>
    <div className="jumbotron">
        <h1 className="display-4 font-weight-bold text-success text-center">Hola, Bienvenido a CASUR!</h1>
        <p className="lead">Estes es el Sistema de Gestión de Turnos Virtuales de la <strong>Caja de Sueldos de Retiro de la Policía Nacional</strong> en el cual, puede solicitar un TURNO VIRTUAL, y en un lapso corto de tiempo nuestros funcionarios estarán en contacto para atender todas tus Solicitudes.</p>
        <hr className="my-4"/>
        <p>Nuestros horarios de atención son de Lunes a Vierns de 7:30am a 4:30pm</p>
        <p className="lead">
        <a className="btn btn-primary btn-lg" onClick={submitBienvenida} role="button">Solicitar Turno</a>
        </p>
</div>
    </> );
}
 
export default Bienvenida;