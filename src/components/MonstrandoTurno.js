import React, {useContext, useEffect} from 'react'
import {FormularioContext} from '../context/contextFormulario';
import {db} from '../firebase'
import useConsultaCantidadTurnos from '../components/Hooks/useConsultaCantidadTurnos';



const MostrantoTurno = () => {
    
    const { datosFormulario, cantidadTurnos} = useContext(FormularioContext);

    const guardandoRegistros = async() =>{      
      await db.collection('datosturno').doc().set(datosFormulario) 
    }

    /* useEffect(() => {
      window.alert(ultimoturno) 
      const objUltimoturno = {
        datoturno : ultimoturno
      }
      db.collection('turnos').doc().set(objUltimoturno)
    }, []) */

    useEffect(() => {
      guardandoRegistros()      
      

    }, [])

    useEffect(() => {
      
    }, [])

    const [ consultaDBturnos] = useConsultaCantidadTurnos()

    

    return ( 
        <>
        <div className="bg-light p-5 m-1 border border-dark">
        <h3 className="text-center">Señor(a)<strong>{datosFormulario.nombreCiudadano}</strong> Se le ha asignado el turno:</h3>
        <h1 className="bg-success text-center mb-3">00{datosFormulario.TurnoAsignado}</h1>
        <div className="border border-success mb-4">
            <h6><strong>Identificación: </strong>{datosFormulario.numeroDocumento}</h6>
            <h6><strong>Correo: </strong>{datosFormulario.correoElectronico}</h6>
            <h6><strong>Celular: </strong>{datosFormulario.numeroCelular}</h6>
        </div>       
        
        <p className="text-center"><strong className='text-white bg-primary px-3'>Por favor tome atenta nota al turno asignado</strong> </p>
        
        <p className="text-justify">En breve un asesor se comunicará con usted a los datos de contacto que nos ha suministrado. Su turno será gestionado por teleorientación.</p>
        <hr/>
        <p className="text-center">Mantenga atento al llamado de nuestros teleorientadores, ya que su ausencia implicará tomar un nuevo turno</p>


        
        
        <div className="text-center">
          <a href="/turnos" className="btn btn-primary btn-block">Seguimiento de turnos</a>
        </div>
        </div>
        </>        
      );
}
 
export default MostrantoTurno;