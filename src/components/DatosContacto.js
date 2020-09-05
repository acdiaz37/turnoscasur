import React, {useContext} from 'react';
import {FormularioContext} from '../context/contextFormulario';

const DatosContacto = () => {
    
    const handleDatosContacto = (e) =>{
        setdatosFormulario({
            ...datosFormulario,
            [e.target.name] : e.target.value
        })
    }

    const botonVolver = (e) =>{
        setpaginador(1)
    }

    const submitDatos = (e) =>{
        e.preventDefault()

    }

    const siguientePagina = (e) => {
        e.preventDefault()
        setpaginador(3)
    }
    
    const { datosFormulario, setdatosFormulario,setpaginador} = useContext(FormularioContext);

    return (
      <>
        <form onSubmit={submitDatos}>
          <label className="font-weight-bolder">Correo Electronico</label>
          <input
            name="correoElectronico"
            className="form-control"
            type="email"
            required
            onChange={handleDatosContacto}
          />
          <label className="font-weight-bolder">Numero Celular</label>
          <input
            name="numeroCelular"
            className="form-control"
            type="text"
            maxlength="10"
            required
            onChange={handleDatosContacto}
          />
          <button className="btn btn-success btn-block mt-3" data-toggle="modal" data-target="#exampleModal">Continuar</button>

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
                    Confirmando Datos
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
                
                        <h4>
                        <strong>Nombre: </strong>
                        </h4>
                        <h5 className='text-uppercase'>{datosFormulario.nombreCiudadano}</h5><br/>

                        <h4>
                            <strong>{datosFormulario.tipoIdentificacion}:</strong>
                        </h4>
                        <h5>{datosFormulario.numeroDocumento}</h5><br/>

                        <h4>
                          <strong>Correo Electronico : </strong>
                        </h4>
                        <h5>{datosFormulario.correoElectronico}</h5><br/>

                        <h4>
                          <strong>Numero Celular: </strong>
                        </h4>
                        <h5>{datosFormulario.numeroCelular}</h5><br/>


                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Atras
                  </button>
                  <button type="button" onClick={siguientePagina} data-dismiss="modal" className="btn btn-primary">
                    Confirmar Datos
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
        <button className="btn btn-danger mt-5" onClick={botonVolver}>
          Volver
        </button>
      </>
    );}
 
export default DatosContacto;