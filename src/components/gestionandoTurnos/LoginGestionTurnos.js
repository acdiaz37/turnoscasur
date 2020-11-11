import React, {useState, useContext} from 'react';
import {FormularioContext} from '../../context/contextFormulario';

const LoginGestionTurnos = () => {

    const [inputs, setinputs] = useState({
        'usuario':'',
        'password':''
    })

    const handleInputs = (e) =>{
        setinputs({
            ...inputs,
            [e.target.name]:e.target.value
        })
    }
    
    const submitlogin=(e)=>{
        
        if (inputs.usuario === 'CASUR' && inputs.password==="CASUR"){
            //CAMBIAR ESTADO PAGINADOR
            //window.alert("inicio sesion")
            setpaginadorGestor(2)
        }
        else{
            window.alert("ha ingresado mal los datos, intente nuevamente")
        }



    }

    const { setpaginadorGestor  } = useContext(FormularioContext);

    return ( <>
     <div className="shadow container-sm login-container border border-success bg-light p-3 mt-5" style={{ maxWidth: 600 }}>
            
                <div className=" login-form-1" onSubmit={submitlogin}>
                    <h2 className="text-dark">Ingresar a Gestión de Turnos</h2>
                    <form>
                        <div className="form-group">
                            <input type="text" className="form-control  border border-dark rounded rounded-sm rounded-lg" placeholder="Usuario*" name='usuario' onChange={handleInputs}/>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control border border-dark " placeholder="Contrasena *" name='password' onChange={handleInputs} />
                        </div>
                        <div className="text-center mb-3">
                            <input type="submit" className=" shadow btn btn-primary btn-block" value="Login" />
                        </div>
                        
                    </form>
                </div>
                
            
        </div>


    </> );
}
 
export default LoginGestionTurnos;