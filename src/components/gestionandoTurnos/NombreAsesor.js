import React from 'react'

const NombreAsesor = () => {
    return ( <>
        <div className="container bg-dark border border-warning">
            <div className="row">
                <div className="col-md-4">
                    <form>                        
                        <h4 className="text-center">Asesor</h4>
                        <label>Ingrese Su nombre Completo: </label>
                        <input className='form-input' type="text"/>
                        <button className='btn btn-block btn-primary'>Ingresar</button>
                    </form>
                </div>
            </div>
        </div>
    </> );
}
 
export default NombreAsesor;