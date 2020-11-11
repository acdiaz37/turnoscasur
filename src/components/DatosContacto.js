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

      var expReg =  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
      var expRegNum = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/
      var esvalido = expReg.test(datosFormulario.correoElectronico)
      var esvalidoNum = expRegNum.test(datosFormulario.numeroCelular)
      
      if (esvalido==false){
        window.alert("el correo electrónico no está en un formato válido, favor revisar")
        
      }
      else if(esvalidoNum==false){
        window.alert("el número de celular suministrado presenta errores, revise por favor si cuenta con 10 digitos o omita el uso de caracteres especiales")
      }
      else{
        //e.preventDefault()
        e.preventDefault()
        setpaginador(3)
      }        
    }
    
    const { datosFormulario, setdatosFormulario,setpaginador} = useContext(FormularioContext);

    return (
      <>
      <div className="bg-light p-5 m-1 border border-dark">
      <h2 className="mb-4">Datos de Contacto</h2>
        <form onSubmit={submitDatos}>
          
          <div className="form-group">
            <label className="font-weight-bolder">Correo Electrónico</label>
            <input
              name="correoElectronico"
              className="form-control"
              type="email" required          
              onChange={handleDatosContacto}
              
             />
            <label className="font-weight-bolder">Número Celular</label>
            <input
              name="numeroCelular"
              className="form-control"
              type="number" required
              maxlength="10"            
              onChange={handleDatosContacto}            
            />          
          <button className="btn btn-success btn-block mt-3" data-toggle="modal" data-target="#exampleModal">Continuar</button>

          </div>

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
                          <strong>Correo Electrónico : </strong>
                        </h4>
                        <h5>{datosFormulario.correoElectronico}</h5><br/>

                        <h4>
                          <strong>Número Celular: </strong>
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
        </div>
        <button className="btn btn-danger my-2" onClick={botonVolver}>
          Volver
        </button>
      </>
    );}
 
export default DatosContacto;