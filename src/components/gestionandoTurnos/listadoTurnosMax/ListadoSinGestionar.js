import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { FormularioContext } from "../../../context/contextFormulario";
import {db} from '../../../firebase'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"


const ListadoSinGestionar = () => {
  const { setpaginadorGestor, guardandoConsultaListaok, setguardandoConsultaListaok } = useContext(FormularioContext);

  const [banderaCarga, setbanderaCarga] = useState(false)

  useEffect(() => {
    //console.log(guardandoConsultaListaok)
  }, [])

  

  const volviendoGestion = () => {
    setpaginadorGestor(3);
  };

  const ejecutaconsola = () =>{
      setbanderaCarga(true)
  }


  

  return (
    <div className="container border border-dark mt-5 mb-2">
      <button
        className="btn btn-block btn-danger m-1"
        onClick={volviendoGestion}
      >
        volver
      </button>
      <div className="text-center ">
      <button  className='btn btn-warning mb-1' onClick={ejecutaconsola}>Mostrar Resultados</button>     
          </div> 
      
      
      <div className="row">
        {banderaCarga ? <>

        {/* {guardandoConsultaListaok.filter((turno,i)=> guardandoConsultaListaok[i].estadoSolicitud==='ok').reverse().slice (0, 50).map((turno2, i)=>(                        
            <div className="col-md-4">
        <div className=" shadow card text-white bg-dark mb-2" >
            <div className="card-body">
                <h4 className="shadow bg-info text-center">00{guardandoConsultaListaok[i].TurnoAsignado}</h4>
                <div className="">
                    <h5 className="bg-dark text-white text-center ">{guardandoConsultaListaok[i].nombreCiudadano}</h5>                                    
                    <h6 ><FontAwesomeIcon icon="id-card"/> : {guardandoConsultaListaok[i].numeroDocumento}</h6>                                
                    <h6><FontAwesomeIcon icon="clock"/> : {guardandoConsultaListaok[i].fecha}</h6>                                
                </div>
                <hr/>

                    <a className="text-primary"><span role="img" aria-label="Asesor">🧍‍♂️</span> <strong>Asesor: </strong></a><br/>
                    <a className='text-white ml-4'>{guardandoConsultaListaok[i].asesorAsignado}</a><br/>
                    
                    <a className="text-primary"><span role="img" aria-label="Hora">⏰</span> <strong>Hora Respuesta: </strong></a><br/>
                    <a className='text-white ml-4'>{guardandoConsultaListaok[i].fechaRespuesta}</a><br/>

                    <a className="text-primary"><span role="img" aria-label="Descripcion">✔️</span> <strong>Solicitud: </strong></a><br/>
                    <a className='text-white ml-4'>{guardandoConsultaListaok[i].descripcionSolicitud}</a><br/>

                    <a className="text-primary"><span role="img" aria-label="Descripcion">📝</span> <strong>Comentarios: </strong></a><br/>
                    <a className='text-white ml-4'>{guardandoConsultaListaok[i].comentarioRespuesta}</a>
                    
                
            </div>
        </div>
        </div>
        ))} */}
            
            {guardandoConsultaListaok.filter((turno,i)=> guardandoConsultaListaok[i].estadoSolicitud==='Sin Gestionar').reverse().slice (0, 20).map((turno2, i)=>(
                <div className="col-md-4">
                <div className="card text-white bg-info mb-2 shadow">
                <div className="card-header align-items-center">
                <h2 className="text-center">
                  <span role="img" aria-label="hasttag">
                    #️⃣
                  </span>{" "}
                  {guardandoConsultaListaok[i].TurnoAsignado}
                </h2>
              </div>
              <div className="card-body">
                <div className="text-center">
                  <h5 className="shadow text-primary border border-primary">
                    {guardandoConsultaListaok[i].nombreCiudadano}
                  </h5>
                  <h6>
                    <FontAwesomeIcon icon="phone" /> : {guardandoConsultaListaok[i].numeroCelular}
                  </h6>
                  <h6>
                    <FontAwesomeIcon icon="id-card" /> :{" "}
                    {guardandoConsultaListaok[i].numeroDocumento}
                  </h6>
                  <h6>
                    <FontAwesomeIcon icon="envelope" /> :{" "}
                    {guardandoConsultaListaok[i].correoElectronico}
                  </h6>
                  <h6>
                    <FontAwesomeIcon icon="clock" /> : {guardandoConsultaListaok[i].fecha}
                  </h6>
                </div>
                <div className=" text-center shadow bg-success border border-dark">
                  <p className="mt-2">{guardandoConsultaListaok[i].descripcionSolicitud}</p>
                </div>
              </div>
            </div>
            </div>
          ))}
            
        </> : null}
          
        
      </div>
    </div>
  );
};

export default ListadoSinGestionar;
