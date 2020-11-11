import React, {useContext} from 'react';
import {FormularioContext} from '../context/contextFormulario';
import Swal from 'sweetalert2';
import TipoTurno from './TipoTurno'
import DatosContacto from './DatosContacto';
import MostrantoTurno from './MonstrandoTurno';
import Bienvenida from './Bienvenida';


const Formulario = () => {

       const submitFormulario = (e) =>{
        e.preventDefault();        
        if(datosFormulario.autorizaDatos === 'No'){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No ha autorizado el uso de sus datos!',
                footer: ''
              })
        }
        else{   
                 
            setpaginador(2)

        }
    }

    const handleFormulario = (e) =>{
        setdatosFormulario({
            ...datosFormulario, 
            [e.target.name] : e.target.value.toUpperCase()
        })
    }

    const {  datosFormulario, setdatosFormulario, paginador, setpaginador} = useContext(FormularioContext);

    return (         
        <>
        {paginador===1 && <>
        <div className="bg-light p-5 m-1 border border-dark">
        <h2 className="mb-2">Diligencia el formulario</h2>
        
        <form onSubmit={submitFormulario}>
            <div className="form-group">
                <label className="font-weight-bolder">Tipo de Afiliación</label>

                <select onChange={handleFormulario} name='tipoAfiliacion' className='form-control'>
                    <option>Titular Asignación</option>
                    <option>Beneficiario</option>
                    <option>Otro</option>                    
                </select>

                <label className="font-weight-bolder">Tipo de Identificación</label>

                <select onChange={handleFormulario} name='tipoIdentificacion' className='form-control'>
                    <option>Cedula de Ciudadania</option>
                    <option>NIT</option>
                    <option>Tarjeta de Identidad</option>
                    <option>Cedula de Extrangeria</option>
                </select>             

                <label className="font-weight-bolder">Número de documento</label>
                <input 
                    name='numeroDocumento' 
                    className='form-control' 
                    type="number" required
                    onChange={handleFormulario}
                />
                <label className="font-weight-bolder">Nombre de Ciudadano</label>
                <input 
                    name='nombreCiudadano' 
                    className='form-control text-uppercase' 
                    type="text" required
                    onChange={handleFormulario}
                />

                <label
                    className='mt-5'
                >¿Autoriza el uso de información Personal a la Caja de Sueldos de Retiro de la Policía Nacional? </label>
                <select onChange={handleFormulario} name='autorizaDatos' className='form-control'>
                    <option>Si</option>
                    <option>No</option>                    
                </select>
                {/* PARA AGREGAR CAPTCHA */}                
                {/* <div class="g-recaptcha brochure__form__captcha" data-sitekey="YOUR SITE KEY"></div> */}
                {/* PARA AGREGAR CAPTCHA */}

                <button type="submit" className="btn btn-primary mt-3 btn-block">Continuar</button>
            </div>
        </form>
        </div>
</>} 
        {paginador===5 && <><Bienvenida/></>} 
        {paginador===2 && <><DatosContacto/></>} 
        {paginador===3 && <><TipoTurno/></>} 
        {paginador===4 && <><MostrantoTurno/></>} 

        
        </>
     );
}
 
export default Formulario;