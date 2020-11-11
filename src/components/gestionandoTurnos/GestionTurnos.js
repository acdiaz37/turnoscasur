import React , {useEffect, useState, useContext} from 'react'
import {db} from '../../firebase'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import LoginGestionTurnos from './LoginGestionTurnos'
import NombreAsesor from './NombreAsesor'
import {FormularioContext} from '../../context/contextFormulario';
import NavBarGestionando from './NavBarGestionando'
import SiguienteTurno from './SiguienteTurno'
import MostrandoHistoricos from './MostrandoHistoricos'
import IndexNuevoGestiont from './nuevoGestorTurnos/IndexNuevoGestiont'
import ListadoSinGestionar from './listadoTurnosMax/ListadoSinGestionar'
import ListadoTramitadosOk from './listadoTurnosMax/ListadoTramitadosOk'



const GestionTurnos = () => {

    const obteniendoTurnos= async() =>{
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
        
    };

    
    //estados de estados jajaja
    const [estadook, setestadook] = useState([])
    const [estadoSinTramitar, setestadoSinTramitar] = useState([])
    const [estadoTramitando, setestadoTramitando] = useState([])
    const [estadoDescartado, setestadoDescartado] = useState([])

    const obteniendoEstados = () =>{
        
        guardandoConsultaTurnos.map((turno,i)=>{return 
            if(turno[i].estadoSolicitud === 'ok'){
                setestadook(turno)
                window.alert('si entro ok')
            }
         })
        
        //setestadook(guardandoConsultaTurnos.filter(ok=> ok.estadoSolicitud === 'ok'))
        
       /*  console.log('mostrando estados ok ')
        console.log(estadook) */
        
    }

    

    //const paginadorGestorT = 1;


    useEffect(() => {
        
        obteniendoTurnos()          
        
    }, [])

    const { paginadorGestor, setpaginadorGestor, setguardandoConsultaTurnos, guardandoConsultaTurnos } = useContext(FormularioContext);

    return ( <>
        <NavBarGestionando/>
        {paginadorGestor === 1 && <><LoginGestionTurnos/></>}
        {paginadorGestor === 4 && <><MostrandoHistoricos/></>}
        {paginadorGestor === 3 && <><IndexNuevoGestiont/></>}
        {paginadorGestor === 2 && <NombreAsesor/>}
        {paginadorGestor === 6 && <ListadoSinGestionar/>}
        {paginadorGestor === 7 && <ListadoTramitadosOk/>}
        {paginadorGestor === 5 && <>
            <div className="">
            <div className="mt-3 container">
            <div className="row justify-content-cente">
                <div className="shadow  bg-light col-md-4 border border-success m-1">
                    <SiguienteTurno/>
                    
                </div>
                
                <div className="shadow bg-light col-md-4 border border-success m-1" style={{ maxheight: 600}}>
                    
                    <h3 className='mt-2 text-center'><a className="shadow bg-danger text-white mx-1 px-2">{guardandoConsultaTurnos.filter((turno)=> turno.estadoSolicitud==='Sin Gestionar').length}</a> Sin gestionar
                    <span role="img" aria-label="error">❌</span>
                    </h3>   
                    {guardandoConsultaTurnos.filter((turno)=> turno.estadoSolicitud==='Sin Gestionar').slice (0, 10).map((turno2, i)=>(                        

                        <div className="card text-white bg-info mb-2 shadow" >
                            <div className="card-header align-items-center">
                                    <h2 className="text-center"><span role="img" aria-label="hasttag">#️⃣</span> {turno2.TurnoAsignado}</h2>
                            </div>
                            <div className="card-body">
                                
                                <div className="text-center">
                                    <h5 className="shadow text-primary border border-primary">{turno2.nombreCiudadano}</h5>           
                                    <h6><FontAwesomeIcon icon="phone"/> : {turno2.numeroCelular}</h6>                                                             
                                    <h6 ><FontAwesomeIcon icon="id-card"/> : {turno2.numeroDocumento}</h6>                                    
                                    <h6><FontAwesomeIcon icon="envelope"/> : {turno2.correoElectronico}</h6>
                                    <h6><FontAwesomeIcon icon="clock"/> : {turno2.fecha}</h6>
                                                                        
                                </div>
                                <div className=" text-center shadow bg-success border border-dark">
                                    <p className='mt-2'>{turno2.descripcionSolicitud}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="shadow bg-light col-md-3 border border-success m-1">
                <h3 className='mt-2 text-center'><a className="shadow bg-success text-white mx-1 px-2">{guardandoConsultaTurnos.filter((turno)=> turno.estadoSolicitud==='ok').length}</a> Gestionados 
                <span role="img" aria-label="check">✅</span>
                </h3>   
                {guardandoConsultaTurnos.filter((turno)=> turno.estadoSolicitud==='ok').reverse().slice (0, 10).map((turno2, i)=>(                        

                    <div className=" shadow card text-white bg-dark mb-2" >
                        <div className="card-body">
                            <h4 className="shadow bg-info text-center">00{turno2.TurnoAsignado}</h4>
                            <div className="">
                                <h5 className="bg-dark text-white text-center ">{turno2.nombreCiudadano}</h5>                                    
                                <h6 ><FontAwesomeIcon icon="id-card"/> : {turno2.numeroDocumento}</h6>                                
                                <h6><FontAwesomeIcon icon="clock"/> : {turno2.fecha}</h6>                                
                            </div>
                            <hr/>

                                <a className="text-primary"><span role="img" aria-label="Asesor">🧍‍♂️</span> <strong>Asesor: </strong></a><br/>
                                  <a className='text-white ml-4'>{turno2.asesorAsignado}</a><br/>
                                
                                <a className="text-primary"><span role="img" aria-label="Hora">⏰</span> <strong>Hora Respuesta: </strong></a><br/>
                                  <a className='text-white ml-4'>{turno2.fechaRespuesta}</a><br/>

                                <a className="text-primary"><span role="img" aria-label="Descripcion">✔️</span> <strong>Solicitud: </strong></a><br/>
                                  <a className='text-white ml-4'>{turno2.descripcionSolicitud}</a><br/>

                                  <a className="text-primary"><span role="img" aria-label="Descripcion">📝</span> <strong>Comentarios: </strong></a><br/>
                                  <a className='text-white ml-4'>{turno2.comentarioRespuesta}</a>
                                  
                            
                        </div>
                    </div>
                    ))}
                </div>
                
            </div>
        </div>
        </div>
        </> }
        
    </>);
}
 
export default GestionTurnos;