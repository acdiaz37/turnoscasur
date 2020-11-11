import React, { useState, useContext, useEffect } from "react";
import { db } from "../../firebase";
import BotonesTipoRespuesta from "./BotonesTipoRespuesta";
import { FormularioContext } from "../../context/contextFormulario";
import Swal from "sweetalert2";
import moment from "moment";
import styled from "styled-components";

const StyledBotonGestyionar = styled.a`
  background-color: black;
  color: white;
  border-radius: 95px 95px 95px 95px;
  -moz-border-radius: 95px 95px 95px 95px;
  -webkit-border-radius: 95px 95px 95px 95px;
  border: 0px solid #000000;
`;

const SiguienteTurno = () => {
  

  const [currentTurno, setcurrentTurno] = useState({});
  

  /* useEffect(() => {
      const onUnload = () => "¿Quieres salir?";
  
      window.addEventListener("beforeunload", onUnload);
  
      return () => window.removeEventListener("beforeunload", onUnload);
    }, []); */

  const solicitaTurno = async () => {
    setestadoTurno(true);
    const extractCurrentTurno = guardandoConsultaTurnos
      .filter((turno) => turno.estadoSolicitud === "Sin Gestionar")
      .sort((a, b) => a.TurnoAsignado - b.TurnoAsignado)[0];
    //console.log(typeof(extractCurrentTurno))
    const extractCurrentTurno2 = {
      ...extractCurrentTurno,
      estadoSolicitud: "Tramitando",
      asesorAsignado: nombreAsesor,
    };
    //extractCurrentTurno = extractCurrentTurno2
    setcurrentTurno(extractCurrentTurno2);

    await db
      .collection("datosturno")
      .doc(extractCurrentTurno2.id)
      .set(extractCurrentTurno2);

    const currentTurnotoDb = {
      currentTurno: extractCurrentTurno2.TurnoAsignado,
    };

    await db
      .collection("currentTurno")
      .doc("kL2PqaUA11gQLEzREwkc")
      .set(currentTurnotoDb);

    //actualizandoTurnoActualdb()
    //actualizandoEstado()
  };

  const guardandogestionado = () => {
    const extractCurrentTurno = currentTurno;
    //console.log(typeof(extractCurrentTurno))
    const extractCurrentTurno2 = {
      ...extractCurrentTurno,
      estadoSolicitud: "ok",
      comentarioRespuesta: valorTextArea,
      fechaRespuesta: formatFecha(),
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

  const actualizandoEstado = async () => {
    /* setcurrentTurno({
            ...currentTurno,
            'estadoSolicitud':'Tramitando'
        })  */
    //await
  };

  const salvandoSolicitud = () => {
    guardandogestionado();
    setestadoTurno(false);
    setrespuestaSeleccionada("");
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

  const {
    setrespuestaSeleccionada,
    guardandoConsultaTurnos,
    respuestaSeleccionada,
    nombreAsesor,
    estadoTurno,
    setestadoTurno
  } = useContext(FormularioContext);

  const [valorTextArea, setvalorTextArea] = useState("");

  const handleTextArea = (e) => {
    setvalorTextArea(e.target.value);
    console.log(valorTextArea);
  };

  const cantidadDeturnosya = () => {
    const validandoCantidadTurnos = guardandoConsultaTurnos.filter(
      (turno) => turno.estadoSolicitud === "Sin Gestionar"
    ).length;
    return validandoCantidadTurnos;
  };

  return (
    <>
      <div className="shadow card bg-light p-2 m-1 border border-dark">
        {cantidadDeturnosya() ? (
          <>
            {estadoTurno ? (
              <></>
            ) : (
              <StyledBotonGestyionar
                className="shadow btn bnt-lg btn-info m-2 p-2"
                onClick={solicitaTurno}
              >
                Gestionar Turno
              </StyledBotonGestyionar>
            )}
          </>
        ) : (
          <h2 className=" m-3 text-center">No hay turnos por Gestionar</h2>
        )}

        {estadoTurno ? (
          <>
            <div className="shadow">
              <h2 className="text-center">
                <a className="shadow bg-success border border-primary text-white mx-1 px-2">
                  Turno Actual: {currentTurno.TurnoAsignado}
                </a>
              </h2>
              <h4 className="text-center mt-2">
                <span role="img" aria-label="Nombre">
                  🟢
                </span>
                {currentTurno.nombreCiudadano}
              </h4>
              <h6>
                <span role="img" aria-label="Telefono">
                  ☎️
                </span>{" "}
                {currentTurno.numeroCelular}
              </h6>
              <h6>
                <span role="img" aria-label="Telefono">
                  📧
                </span>{" "}
                {currentTurno.correoElectronico}
              </h6>
              <h6>
                <span role="img" aria-label="Id">
                  🆔
                </span>{" "}
                {currentTurno.numeroDocumento}
              </h6>
              <hr />
              <h5 className="text-justify mb-2">
                <span role="img" aria-label="Descripcion">
                  📝
                </span>{" "}
                {currentTurno.descripcionSolicitud}
              </h5>
            </div>
            <BotonesTipoRespuesta />
            <br />
            <label>Comentarios: </label>
            <textarea
              onChange={handleTextArea}
              className="shadow form-control"
              id="exampleFormControlTextarea1"
              rows="6"
            ></textarea>

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
            ) : null}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default SiguienteTurno;
