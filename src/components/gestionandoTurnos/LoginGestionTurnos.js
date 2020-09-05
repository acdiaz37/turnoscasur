import React from 'react';

const LoginGestionTurnos = () => {
    return ( <>
        <div className="container bg-dark border border-warning">
            <div className="row">
                <div className="col-md-4">
                    <form>
                        <label>Usuario</label>
                        <input className='form-input' type="text"/>
                        <label>Contraseña</label>
                        <input className='form-input' type="password"/>
                        <button className='btn btn-block btn-primary'>Ingresar</button>
                    </form>
                </div>
            </div>
        </div>
    </> );
}
 
export default LoginGestionTurnos;