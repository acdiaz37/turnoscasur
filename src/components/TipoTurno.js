import React, { useContext, useEffect, useState} from 'react';
import {FormularioContext} from '../context/contextFormulario';
import {db} from '../firebase'
import BotonesTipoTurno from './BotonesTipoTurno';
import moment from 'moment';

import useConsultaCantidadTurnos from '../components/Hooks/useConsultaCantidadTurnos';
//import * as firebase from 'firebase/app'

const TipoTurno = () => {

    //const [] = useConsultaCantidadTurnos

    const {ultimoturno, setcantidadTurnos, cantidadTurnos, setultimoturno, setdatosFormulario, datosFormulario, turnoSeleccionado, setturnoSeleccionado, setpaginador} = useContext(FormularioContext);  
    
    const [verCheck, setverCheck] = useState(true)

    useEffect(() => {
        const obtenerTurno = () => {
            db.collection('turnos').orderBy('datoturno','desc').limit(1).onSnapshot(manejarSnapshot)
        }
        obtenerTurno()
        
        
        //obteniendoCantidadTurnos()
    }, [])

    const [ consultaDBturnos] = useConsultaCantidadTurnos()

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
    
    const formatFecha =() =>{
        let a = moment().format("h:mm:ss a, DD/M/YYYY");
        return a
    }

    


    const continuandoFormulario = async () =>{

        if (datosFormulario.descripcionSolicitud===''|| datosFormulario.tipoTurno===''){
            window.alert("no ha seleccionado turno o no ha descrito su solicitud")
        }
        else{ 
            consultaDBturnos()           
            const objUltimoturno = {
                datoturno : ultimoturno
            }
            const paraturno = objUltimoturno.datoturno
            //window.alert(paraturno)
            setdatosFormulario({
                ...datosFormulario,
                TurnoAsignado: paraturno,            
                fecha : formatFecha()
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

    const handleRadicado = (e) => {
        setdatosFormulario({
            ...datosFormulario,
            [e.target.name] : e.target.value,
        })
    }

    const handleIdTitular = (e) => {
        setdatosFormulario({
            ...datosFormulario,
            [e.target.name] : e.target.value,
        })
    }
    

    const handleChecked = (e) => {
        
        setverCheck(!e.target.checked)
        
    }



    return ( 
        <>
        <div className="bg-light p-5 m-1 border border-dark">
        <h3>Buen día, Señor(a)<strong className='text-uppercase'>{datosFormulario.nombreCiudadano}</strong></h3>
        
    {turnoSeleccionado ?
         <>
         <p className="text-center">Ha seleccionado: </p> <p className="font-weight-bolder text-center">{turnoSeleccionado}</p>
         <div className="text-center">
            <button className="btn btn-danger btn-sm text-center" onClick={clickAtras}>Deshacer</button>         
         </div>
         </>
         :
         <>
         <h5 className="text-center">Seleccione un tipo de turno</h5>
         <div className="text-center">
            <BotonesTipoTurno/>
         </div>
         </>
         }
        <hr/>
        <div className="form-group mt-3">

        {datosFormulario.tipoAfiliacion==='BENEFICIARIO'? <>
        <label>Usted ha indicado ser beneficiario, favor indicar cédula del Titular</label>
        <input 
                    name='identificacionTitular' 
                    className='form-control'                     
                    type="number"                     
                    onChange={handleIdTitular}
                    placeholder = 'Cédula Titular'
                />
        <hr/>
        </>:null}
        
        
        <div className="form-check">
            <input className="form-check-input" type="checkbox" onChange={handleChecked}/>
            <label className="form-check-label" for="disabledFieldsetCheck">
                ¿Es seguimiento a Radicado?
            </label>

            <br/>
            {verCheck ? 
            null:
            <>
                <input 
                    name='numeroRadicado' 
                    className='form-control'                     
                    type="number"                     
                    onChange={handleRadicado}
                    placeholder = 'Número Radicado'
                />
            </>
            }
            
            
        </div>
        <br/>

            <label>Ingrese un resumen del motivo de su consulta</label>
            <textarea 
                onChange={hadleTextArea}
                className='form-control'
                name="descripcionSolicitud" id="" cols="10" rows="5"
            ></textarea>
        </div>
        <button onClick={continuandoFormulario} className="btn btn-warning btn-block">Continuar</button>

        </div>
        </>
     );
}
 
export default TipoTurno;