import React, {useContext, useEffect} from 'react'
import {FormularioContext} from '../context/contextFormulario';
import {db} from '../firebase'



const MostrantoTurno = () => {
    
    const { datosFormulario, ultimoturno} = useContext(FormularioContext);

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

    return ( 
        <>
        <h2 className="text-center">Señor(a)<strong>{datosFormulario.nombreCiudadano}</strong> Se le ha asigando el turno:</h2>
        <h1 className="bg-success text-center mb-3">00{datosFormulario.TurnoAsignado}</h1>
        <div className="border border-success mb-4">
            <h6><strong>Identifiación: </strong>{datosFormulario.numeroDocumento}</h6>
            <h6><strong>Correo: </strong>{datosFormulario.correoElectronico}</h6>
            <h6><strong>Celular: </strong>{datosFormulario.numeroCelular}</h6>
        </div>       
        
        <p>En breve un asesor se comunicará con usted a los datos de contacto que nos ha suministrado, puede visualizar la secuencia de turnos en el siguiente link</p>
        
        <div className="text-center">
          <button className="btn btn-primary">Seguimiento de turnos(Not working yet)</button>
        </div>
        </>        
      );
}
 
export default MostrantoTurno;