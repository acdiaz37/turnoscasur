import React from 'react'
import Formulario from './Formulario'
import ImagenComunicacion from './ImagenComunicacion';
import FormularioProvider from '../context/contextFormulario';
import NavBar from './NavBar';

const Home = () => {
    return ( <>
        <FormularioProvider>
        <NavBar/>
        <div className="container border border-primary rounded mt-3">
            <div className="row">
                <div className="col-md-6 align-self-center d-flex justify-content-center">
                    <ImagenComunicacion/>
                </div>
                <div className="col-md-6 align-self-center">
                    <Formulario/>
                </div>  
            </div>         
        </div>
        </FormularioProvider>
    </> );
}
 
export default Home;