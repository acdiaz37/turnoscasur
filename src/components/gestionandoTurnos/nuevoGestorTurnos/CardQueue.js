import React,{useContext, useEffect, useState} from 'react'
import styled from 'styled-components'
import {FormularioContext} from '../../../context/contextFormulario';
import {db} from '../../../firebase'
import useConsultaCantidadTurnos from '../../Hooks/useConsultaCantidadTurnos';



const CardQueue = () => {

    

    useEffect(() => {       

        //cantidadTurnosFinal()  
        consultaDBturnos()
        cantidadsinGestionar()  
        cantidadenTramite()
         
    }, [])

    const [ consultaDBturnos] = useConsultaCantidadTurnos()

    /* const obteniendoCantidadTurnos = ()=>{

         db.collection("cantidadTurnos").doc('LNdH11d8MCstoTwoHeEe')
            .onSnapshot(function(doc){                
                setcantidadTurnos(doc.data())
        })
    } */

    const [turnosSinGestioanr, setturnosSinGestioanr] = useState([])

    const {guardandoConsultaTurnos, setcantidadTurnos, setguardandoConsultaTurnos, soloSinTramitar, setsoloSinTramitar, cantidadTurnos } = useContext(FormularioContext);

    const cantidadsinGestionar = () =>{
        try {
            db.collection("datosturno")
            .where("estadoSolicitud", "==", "Sin Gestionar")        
            .orderBy('TurnoAsignado', 'asc')
            .onSnapshot(
            (querySnapshot)=>{
                const docs = []
                querySnapshot.forEach(doc =>{                       
                    docs.push(
                        {...doc.data(), id:doc.id})
                })
                setguardandoConsultaTurnos(docs)

                
                
        })
                
        } catch (error) {
            console.log(error)
            window.alert('se fue por error cantidad sin gestionar')            
        }


    }

    const cantidadenTramite = () =>{
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

    

    return (
        
        <div className="container mt-2">
            <div className='row'>
            <div className='col-sm-4'>
            <div className="card bg-success">
                    <div className="p-1 m-1  mb-0 text-center">
                        <h4 className="text-white">✅ Gestionados</h4>
                        {/* <h4>{guardandoConsultaTurnos.filter((turno)=> turno.estadoSolicitud==='ok').length}</h4> */}
                        <h4>{cantidadTurnos.ok}</h4>
                    </div>
                </div>                
            </div>

            <div className='col-sm-4'>
            <div className="card bg-warning">
                    
                    <div className="p-1 m-1  mb-0 text-center">
                    
                        <h4 className="text-white">🏃 Tramitando</h4>                        
                        <h4>{soloSinTramitar.filter((turno)=> turno.estadoSolicitud==='Tramitando').length}
                            
                        </h4>
                    </div>
                </div>                
            </div>

            <div className="col-sm-4">
            <div className="card bg-danger">
                    <div className="p-1 m-1  mb-0 text-center">
                        <h4 className="text-white">❌ Sin Gestionar</h4>                        
                        <h4>{guardandoConsultaTurnos.filter((turno)=> turno.estadoSolicitud==='Sin Gestionar').length}</h4>
                    </div>
                </div>
            </div>
            
        </div>  
        </div>
    )
}

export default CardQueue
