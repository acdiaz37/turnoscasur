import React from 'react'
import Formulario from './Formulario'
import ImagenComunicacion from './ImagenComunicacion';

import NavBar from './NavBar';
import FooterGeneral from './FooterGeneral';

const Home = () => {
    return ( <>
        
        <NavBar/>
        <div className="shadow container border border-primary rounded mt-3">
            <div className="row">
                <div className="col-md-6 align-self-center d-flex justify-content-center">
                    <ImagenComunicacion/>
                </div>
                <div className="col-md-6 align-self-center">
                    <Formulario/>
                </div>  
            </div>         
        </div>
        <FooterGeneral/>
        
    </> );
}
 
export default Home;