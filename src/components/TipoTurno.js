import React, { useContext, useEffect} from 'react';
import {FormularioContext} from '../context/contextFormulario';
import {db} from '../firebase'
import BotonesTipoTurno from './BotonesTipoTurno';

const TipoTurno = () => {

    const {ultimoturno, setultimoturno, setdatosFormulario, datosFormulario, turnoSeleccionado, setturnoSeleccionado, setpaginador} = useContext(FormularioContext);    

    useEffect(() => {
        const obtenerTurno = () => {
            db.collection('turnos').orderBy('datoturno','desc').limit(1).onSnapshot(manejarSnapshot)
        }
        obtenerTurno()
    }, [])

    function manejarSnapshot(snapshot){
        const turnoR = snapshot.docs.map(doc => {
            return{                
                ...doc.data()
            }
        })
        setultimoturno((turnoR[0].datoturno)+1)
        
        

    }

    const clickAtras = () =>{
        setturnoSeleccionado("")
    }    

   

    const continuandoFormulario = async () =>{

        if (datosFormulario.descripcionSolicitud===''|| datosFormulario.tipoTurno===''){
            window.alert("no ha seleccionado turno o no ha descrito su solicitud")
        }
        else{            
            const objUltimoturno = {
                datoturno : ultimoturno
            }
            const paraturno = objUltimoturno.datoturno
            //window.alert(paraturno)
            setdatosFormulario({
                ...datosFormulario,
                TurnoAsignado: paraturno,            
                fecha : +new Date()
            })
             
            await db.collection('turnos').doc().set(objUltimoturno)
            
            setpaginador(4)
        }
        
        
        
    }

    const hadleTextArea = (e) => {
        setdatosFormulario({
            ...datosFormulario,
            [e.target.name] : e.target.value,
        })
    }


    return ( 
        <>
        <h3>Buen dia, Señor(a)<strong className='text-uppercase'>{datosFormulario.nombreCiudadano}</strong></h3>
        
    {turnoSeleccionado ?
         <>
         <h5>Ha seleccionado: </h5> <h4>{turnoSeleccionado}</h4>
         <button className="btn btn-warning" onClick={clickAtras}>Atras</button>         
         </>
         :
         <>
         <h5>Seleccione un tipo de turno</h5>
         <BotonesTipoTurno/></>
         }
      
        <div className="form-group">
            <label>Ingrese un resumen del motivo de su inquietud</label>
            <textarea 
                onChange={hadleTextArea}
                className='form-control'
                name="descripcionSolicitud" id="" cols="10" rows="5"
            ></textarea>
        </div>
        <button onClick={continuandoFormulario} className="btn btn-warning btn-block">Continuar</button>

        
        </>
     );
}
 
export default TipoTurno;