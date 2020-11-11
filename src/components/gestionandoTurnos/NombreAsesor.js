import React, {useContext, useState} from 'react';
import {FormularioContext} from '../../context/contextFormulario';

const NombreAsesor = () => {
   
    
    const submitNombre=(e)=>{
        e.preventDefault();
        setpaginadorGestor(3);
        setnombreAsesor(nombreAs.nombreAsesor)
    }
    const { nombreAsesor, setnombreAsesor, setpaginadorGestor  } = useContext(FormularioContext);

    const [nombreAs, setnombreAs] = useState({
        'nombreAsesor':''
    })

    const cambiandoNombre=(e)=>{
        setnombreAs({
            ...nombreAs,[e.target.name]:e.target.value
        })
    }

    return ( <>
         <div className="shadow bg-light mt-5 container-sm login-container border border-success bg-white" style={{ maxWidth: 600 }}>
            
            <div className=" mt-3 login-form-1">
                <h2 className="text-dark">Ingrese Sus nombres y apellidos</h2>
                <form onSubmit={submitNombre}>
                    <div className="form-group">
                        <input onChange={cambiandoNombre} type="text" required className="form-control border border-dark rounded rounded-sm rounded-lg" placeholder="Nombre*" name='nombreAsesor'/>
                    
                    </div>
                   
                    <div className="text-center mb-3">                        
                        <button type="submit" className="shadow btn btn-primary btn-block">Continuar</button>
                    </div>
                    
                </form>
            </div>
            
        
    </div>
    </> );
}
 
export default NombreAsesor;