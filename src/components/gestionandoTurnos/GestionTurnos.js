import React , {useEffect, useState, useContext} from 'react'
import {db} from '../../firebase'
import LoginGestionTurnos from './LoginGestionTurnos'
import NombreAsesor from './NombreAsesor'
import {GestorContext} from '../../context/contextGestor';



const GestionTurnos = () => {

    const obteniendoTurnos= async() =>{
        db.collection("datosturno").orderBy('TurnoAsignado', 'desc').limit(10).onSnapshot(
            (querySnapshot)=>{
                const docs = []
                querySnapshot.forEach(doc =>{                       
                    docs.push(
                        {...doc.data(), id:doc.id})
                })
                setguardandoConsultaTurnos(docs)
                console.log(docs)
        })
        
    };

    const [guardandoConsultaTurnos, setguardandoConsultaTurnos] = useState([]);

    //const { paginadorGestorT } = useContext(GestorContext);

    const paginadorGestorT = 1;


    useEffect(() => {
        console.log("obteniendo datos...")
        obteniendoTurnos()   
        console.log("paginador")
        console.log(paginadorGestorT)
    }, [])

    return ( <>
        {/* {paginadorGestorT === "" && <><h2>Hola</h2><LoginGestionTurnos/></>}
        {paginadorGestorT === 2 && <NombreAsesor/>}
        {paginadorGestorT === 3 &&} */}
            <div className="container mt-5">
            <div className="row">
                {/* <div className="col-md-5 border border-success m-1">
                    hola 2
                </div>
                <div className="col-md-3 border border-success m-1">
                    hola 2
                </div> */}
                <div className="col-md-10 border border-success m-1">
                    {guardandoConsultaTurnos.map((turno, i)=>(
                        <div className="card mb-1">
                            <div className="card-body">
                                <h3 className="bg-warning">00{guardandoConsultaTurnos[i].TurnoAsignado}</h3>
                                <div className="p-1 m-1">

                                    <h4 className="bg-dark text-primary">{guardandoConsultaTurnos[i].nombreCiudadano}</h4>
                                    <h6>IDENTIFICACION: {guardandoConsultaTurnos[i].numeroDocumento}</h6>
                                    <h6>CELULAR: {guardandoConsultaTurnos[i].numeroCelular}</h6>
                                    <h6>CORREO: {guardandoConsultaTurnos[i].numeroCelular}</h6>
                                    <h6>FECHA: {guardandoConsultaTurnos[i].fecha}</h6>
                                </div>
                                <div className="border border-success p-1 m-1">
                                    <p className='mx-1'>{guardandoConsultaTurnos[i].descripcionSolicitud}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div> 
        
    </>);
}
 
export default GestionTurnos;