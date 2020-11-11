import React, { useState, useContext, useEffect } from "react";
import { FormularioContext } from "../../../context/contextFormulario";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BotonesTipoRespuesta from "../BotonesTipoRespuesta";
import Swal from "sweetalert2";
import { db } from "../../../firebase";
import moment from "moment";
import BanderaTramitando from "./BanderaTramitando";

const estilosLabelPrincipales =
  "form-control bg-primary text-white d-inline-block";

const estilosCondicionales = "form-control text-dark d-inline-block";

const estilosLabelTitulos = "text-light";

const StyledCardCurrentTurno = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 25em;
`;

const StyledFecha = styled.div`
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
`;
const NuevoGestiort = () => {
   
    const handleTextArea = (e) => {
      setvalorTextArea(e.target.value);
      //console.log(valorTextArea);
    };

  const [valorTextArea, setvalorTextArea] = useState("");

  const { currentTurno, cantidadTurnos, setestadoTurno, setrespuestaSeleccionada, nombreAsesor, setcurrentTurno, estadoTurno, respuestaSeleccionada } = useContext(FormularioContext);

  useEffect(() => {
    if(currentTurno.numeroDocumento){
      /* console.log('si paso por guardar1 y 2')
      console.log(currentTurno) */
      guardando1()      
    }
      
    
  }, [currentTurno.numeroDocumento])



  const salvandoSolicitud = () => {
    guardandogestionado();    
    setestadoTurno(false);
    setrespuestaSeleccionada("");
    setcurrentTurno({})
    db.collection('cantidadTurnos').doc('LNdH11d8MCstoTwoHeEe').set({
      ...cantidadTurnos,                
      ok: (cantidadTurnos.ok)+1,      
    })
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: "Turno Gestionado! ✅",
    });

    
  };

  const guardandogestionado = () => {
    const extractCurrentTurno = currentTurno;
    //console.log(typeof(extractCurrentTurno))
    const extractCurrentTurno2 = {
      ...extractCurrentTurno,
      estadoSolicitud: "ok",
      comentarioRespuesta: valorTextArea,
      fechaRespuesta: formatFecha(),
      opcionRespuesta: respuestaSeleccionada
    };
    //extractCurrentTurno = extractCurrentTurno2
    setcurrentTurno(extractCurrentTurno2);

    db.collection("datosturno")
      .doc(extractCurrentTurno2.id)
      .set(extractCurrentTurno2);
  };

  const formatFecha = () => {
    let a = moment().format("h:mm:ss a, DD/M/YYYY");
    return a;
  };

  const clickconsole = () =>{
    /* console.log('desde clockconsole')
    console.log(currentTurno) */
    guardando1()
    
    /* console.log('desde clockconsole con guardado en DB')
    console.log(currentTurno) */

  }

  const guardando1 = () =>{        
          const extractCurrentTurno = currentTurno;  
          const extractCurrentTurno2 = {
            ...extractCurrentTurno,
            estadoSolicitud: "Tramitando",
            asesorAsignado: nombreAsesor,
          };                  
          setcurrentTurno(extractCurrentTurno2) 
          
          db.collection("datosturno")
              .doc(extractCurrentTurno2.id)
              .set(extractCurrentTurno2);
          
          const currentTurnotoDb = {
              currentTurno: extractCurrentTurno2.TurnoAsignado,
          };
            
          db.collection("currentTurno")
              .doc("kL2PqaUA11gQLEzREwkc")
              .set(currentTurnotoDb);
          
          //window.alert('paso guardar en database')
}




  return (
    <>
      {currentTurno.numeroDocumento ? (
        <>
          <div className="container bg-primary my-3 p-2 shadow ">
            <h3 className="text-light text-center mb-3">GESTIÓN TURNOS</h3>
            {/* <a className='btn btn-success' onClick={clickconsole}>console</a> */}
            
            <StyledCardCurrentTurno>
              <div className="row">
              <StyledFecha className="col-sm-4">
                  <h6 className="text-warning text-center">
                    Tipo Turno:
                  </h6>
                  <h6 className="text-white text-center">
                    {currentTurno.tipoTurno}
                  </h6>
                </StyledFecha>
                <div className="card bg-light col-sm-4">
                  <h4 className="text-center mt-1">Turno Actual</h4>
                  <h3 className="text-center text-success">
                    {currentTurno.TurnoAsignado}
                  </h3>
                </div>
                <StyledFecha className="col-sm-4">
                  <h6 className="text-warning text-center">
                    Fecha Solicitud Turno:
                  </h6>
                  <h6 className="text-white text-center">
                    {currentTurno.fecha}
                  </h6>
                </StyledFecha>

                

              </div>
            </StyledCardCurrentTurno>
            <div className="row mt-2">
              <div className="form-group col-sm-7">
                <label type="text" className={estilosLabelTitulos}>
                  👤 Nombre Ciudadano
                </label>
                <label type="text" className={estilosLabelPrincipales}>
                  {currentTurno.nombreCiudadano}
                </label>
              </div>

              <div className="form-group col-sm-5">
                <FontAwesomeIcon className="text-light mr-2" icon="id-card" />
                <label type="text" className={estilosLabelTitulos}>
                  Cédula de ciudadanía
                </label>
                <label type="text" className={estilosLabelPrincipales}>
                  {currentTurno.numeroDocumento}
                </label>
              </div>
              {currentTurno.identificacionTitular ? (
                <>
                  <div className="form-group col-sm-7">
                    <div className="col-sm-7">
                      <FontAwesomeIcon
                        className="text-light mr-2"
                        icon="id-card"
                      />
                      <label type="text" className={estilosLabelTitulos}>
                        Cédula de ciudadanía Titular
                      </label>
                      <label type="text" className={estilosCondicionales}>
                        {currentTurno.identificacionTitular}
                      </label>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
              {currentTurno.numeroRadicado ? (
                <>
                  <div className="col-sm-3">
                    <label type="text" className={estilosLabelTitulos}>
                      📌 Seguimiento a radicado
                    </label>
                    <label type="text" className={estilosCondicionales}>
                      Id {currentTurno.numeroRadicado}{" "}
                    </label>
                  </div>
                </>
              ) : (
                <></>
              )}
                <div className="col-sm-12">
                    <br className="bg-white " />
                </div>
              <div className="form-group col-sm-7">
                <label type="text" className={estilosLabelTitulos}>
                  📧 Correo Electrónico
                </label>
                <label type="text" className={estilosLabelPrincipales}>
                  {currentTurno.correoElectronico}
                </label>
              </div>
              <div className="form-group col-sm-5">
                <label type="text" className={estilosLabelTitulos}>
                  📞 Número telefónico
                </label>
                <label type="text" className={estilosLabelPrincipales}>
                  {currentTurno.numeroCelular}
                </label>
              </div>

              <div className="form-group col-sm-12 text justify-content-center">
                <p type="text" className={estilosLabelTitulos}>
                  📑 Comentario a la Solicitud
                </p>
                <textarea
                  className="form-control bg-primary text-white"
                  disabled = {true}                         
                  rows="5"                           
                >
                  {currentTurno.descripcionSolicitud}
                </textarea>                
              </div>

              <div className="col-sm-12 mb-2">
                <hr className="bg-white" />
                <div className="text-center">
                    <BotonesTipoRespuesta />
                </div>                
                <label className={estilosLabelTitulos}>
                  Comentarios de Respuesta:
                </label>
                <textarea
                  onChange={handleTextArea}
                  className="shadow form-control"
                  cols="10"
                  rows="4"
                ></textarea>
              </div>
            </div>
            
            {respuestaSeleccionada ? (
              <>
                <button
                  className="shadow btn btn-success btn-block my-3"
                  data-toggle="modal"
                  data-target="#exampleModal"
                >
                  Continuar
                </button>

                <div
                  className="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h4 className="modal-title" id="exampleModalLabel">
                          Gestion de turno
                        </h4>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <div className="text-center mb-2">
                          <h4>
                            <span role="img" aria-label="Nombre">
                              🟢
                            </span>
                            {currentTurno.nombreCiudadano}
                          </h4>
                          <h5>
                            <span role="img" aria-label="Telefono">
                              ☎️
                            </span>{" "}
                            {currentTurno.numeroCelular}
                          </h5>
                        </div>
                        <hr />
                        <h5>
                          <span role="img" aria-label="Asesor">
                            🧍‍♂️
                          </span>
                          <strong> Asesor: </strong>
                          {nombreAsesor}
                        </h5>
                        <h5>
                          <span role="img" aria-label="Descripcion">
                            ✔️
                          </span>{" "}
                          <strong>Tipo: </strong>
                          {respuestaSeleccionada}
                        </h5>
                        <h5 className="mb-2">
                          <span role="img" aria-label="Descripcion">
                            📝
                          </span>{" "}
                          <strong>Comentarios: </strong>
                          {valorTextArea}
                        </h5>

                        {/* 
              

              <h4>
                  <strong>{datosFormulario.tipoIdentificacion}:</strong>
              </h4>
              <h5>{datosFormulario.numeroDocumento}</h5><br/>

              <h4>
                <strong>Correo Electrónico : </strong>
              </h4>
              <h5>{datosFormulario.correoElectronico}</h5><br/>

              <h4>
                <strong>Numero Celular: </strong>
              </h4>
              <h5>{datosFormulario.numeroCelular}</h5><br/> */}
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="shadow btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Atras
                        </button>
                        <button
                          type="button"
                          onClick={salvandoSolicitud}
                          data-dismiss="modal"
                          className="shadow btn btn-primary"
                        >
                          Confirmar Datos
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : <></>}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default NuevoGestiort;
