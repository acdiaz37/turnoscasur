  
import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import FormularioProvider from './context/contextFormulario';
import Home from './components/Home'
import Patallaturnos from './components/pantallaturnos/Pantallaturnos';
import GestionTrunos from './components/gestionandoTurnos/GestionTurnos';
import TurnosReloj from './components/pantallaturnos/TurnosReloj';


//import PrincipalContainer from './components/PrincipalContainer';
//import PrincipalContainer2 from './components/PrincipalContainer2';

const Routes = () => {
    return(
        <BrowserRouter>
        <Switch>
        <FormularioProvider>
            <Route  exact path='/' component={Home}/>    
            <Route  exact path='/turnos' component={Patallaturnos}/>    
            <Route  exact path='/gestion' component={GestionTrunos}/>    
            <Route  exact path='/reloj' component={TurnosReloj}/>
            
        </FormularioProvider>
        </Switch>
        </BrowserRouter>
    )

}

export default Routes;