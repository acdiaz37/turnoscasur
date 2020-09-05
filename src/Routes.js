  
import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './components/Home'
import Patallaturnos from './components/pantallaturnos/Pantallaturnos';
import GestionTrunos from './components/gestionandoTurnos/GestionTurnos';

//import PrincipalContainer from './components/PrincipalContainer';
//import PrincipalContainer2 from './components/PrincipalContainer2';

const Routes = () => {
    return(
        <BrowserRouter>
        <Switch>
            <Route  exact path='/' component={Home}/>    
            <Route  exact path='/turnos' component={Patallaturnos}/>    
            <Route  exact path='/gestion' component={GestionTrunos}/>    

        </Switch>
        </BrowserRouter>
    )

}

export default Routes;