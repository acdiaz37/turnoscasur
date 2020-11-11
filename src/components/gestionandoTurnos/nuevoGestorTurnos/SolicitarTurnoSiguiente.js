import React, { useState, useContext, useEffect } from 'react';
import {FormularioContext} from '../../../context/contextFormulario';
import {db} from '../../../firebase'
import useConsultaCantidadTurnos from '../../Hooks/useConsultaCantidadTurnos';
import BanderaTramitando from './BanderaTramitando';



const SolicitarTurnoSiguiente = () => {

    const [sumarTramitando, restarSinGestionar] = useConsultaCantidadTurnos()

    useEffect(() => {        
        //consultaDBturnos()
        cantidadenTramiteForm()
    }, [])

    /* const obteniendoCantidadTurnos = ()=>{

        db.collection("cantidadTurnos").doc('LNdH11d8MCstoTwoHeEe')
           .onSnapshot(function(doc){                
               setcantidadTurnos(doc.data())
       })
   } */

    const { guardandoConsultaTurnos, soloSinTramitar, nombreAsesor, setcurrentTurno, cantidadTurnos, currentTurno, setguardandoConsultaTurnos, setsoloSinTramitar, setbanderaTramitando } = useContext(FormularioContext);

    const [estadoTurno, setestadoTurno] = useState(false)    

    const [turnosCero, setTurnosCero] = useState('cero')

    
    const verificadorTurnosCero = () =>{
        if (cantidadTurnos.SinGestionar == 0){
            setTurnosCero('cero')
        }
        else{
            setTurnosCero('nocero')
        }
    }
    const ConsultarProximoTurno = ()=>{   
           
                setestadoTurno(true)
                db.collection("datosturno")
                .where("estadoSolicitud", "==", "Sin Gestionar").orderBy("TurnoAsignado").limit(1)                
                .get()                                        
                    .then (function(querySnapshot){
                        const docs =[]
                        querySnapshot.forEach(doc => {
                            docs.push(
                                {...doc.data(), id:doc.id}
                            )
                        })
                        const objetotemp = docs[0]                        
                        setcurrentTurno(objetotemp)
                        
                    }).catch(function(error) {
                        console.log("Error getting document:", error);
                    });
             

            
    }    

    const guardanndfinal =  () =>{        
            
        const extractCurrentTurno = currentTurno;
        const extractCurrentTurno2 ={
            ...extractCurrentTurno,
            estadoSolicitud:'Tramitando',
            asesorAsignado: nombreAsesor
        }        
        setcurrentTurno(extractCurrentTurno2) 
        
        /* db
            .collection("datosturno")
            .doc(extractCurrentTurno2.id)
            .set(extractCurrentTurno2); */
        
            /* console.log(currentTurno)  */       
            //window.alert('para ahi ')
            /* guardarDatabaseCurrent() */
        
    }

    

    const guardarDatabaseCurrent = () =>{
         
        
        const currentTurnotoDb = {
            currentTurno: currentTurno.TurnoAsignado,
        };
          
        db
            .collection("currentTurno")
            .doc("kL2PqaUA11gQLEzREwkc")
            .set(currentTurnotoDb);
    }

    const cantidadenTramiteForm = () =>{
        try {
            db.collection("datosturno")
            .where("estadoSolicitud", "==", "Tramitando")        
            .orderBy('TurnoAsignado', 'asc')
            .onSnapshot(
            (querySnapshot)=>{
                const docs = []
                querySnapshot.forEach(doc =>{                       
                    docs.push(
                        {...doc.data(), id:doc.id})
                })
                setsoloSinTramitar(docs)

                
                
        })
                
        } catch (error) {
            console.log(error)
            window.alert('se fue por error cantidad sin gestionar')            
        }


    }
 

    const NuevosolicitaTurno = ()=>{  
            //verificadorTurnosCero()   
           setestadoTurno(true);   
           ConsultarProximoTurno() 
           guardanndfinal()
           //setbanderaTramitando(true)
           
    }

    const solucionandoTramintando = ()=>{
        //window.alert('solucionando tramitando')
        //console.log(soloSinTramitar)
        
        soloSinTramitar.forEach(element => {
            const extraerTurnoTramitando2 = {
                ...element,
                estadoSolicitud: "Sin Gestionar"
            }
            db.collection("datosturno")
              .doc(extraerTurnoTramitando2.id)
              .set(extraerTurnoTramitando2);

              /* window.alert(element.id)
              window.alert(element.estadoSolicitud) */

        })

    }

    const verificaCuentacero = () =>{
        if(soloSinTramitar.filter((turno)=> turno.estadoSolicitud==='Tramitando').length===0){
            return false
        }
        else{
            return true
        }
    }

    return (<>
      <div className="container d-flex justify-content-center">
        {currentTurno.numeroDocumento ? null : (
          <>
            {guardandoConsultaTurnos.filter(
              (turno) => turno.estadoSolicitud === "Sin Gestionar"
            ).length > 0 ? (
              <button
                className="shadow btn btn-lg btn-block btn-info mx-5 mt-4 p-2"
                onClick={NuevosolicitaTurno}
              >
                {" "}
                Nuevo Gestionar Turno
              </button>
            ) : (
              <>
                <div className="alert alert-dismissible alert-success mt-5">
                  <h3 className='text-center p-3'>
                    <strong className='text-primary'>No hay turnos!</strong> <br/>Se han gestionado todos los turnos con éxito! 👍
                  </h3>
                </div>
              </>
            )}
            
          </>
        )}
      </div>
      <div className="container justify-content-center">
                {currentTurno.numeroDocumento ? null:(
                    <>
                    {soloSinTramitar.filter(
                        (turno) => turno.estadoSolicitud === "Tramitando"
                    ).length > 0 ?
                <> 
                <div className="form-control-sm  border border-warning text-center mt-2" role="alert">
                <h6  className=''>Hay turnos sin tramitar, si este mensaje persiste proceda a{"        "}        
                <a href="#" onClick={solucionandoTramintando} className='badge badge-warning'>Solucionar</a>
                </h6>
                
                </div>
                </>:null
                }
                    </>
                )}
            </div>             
      </>
    );
}

export default SolicitarTurnoSiguiente
