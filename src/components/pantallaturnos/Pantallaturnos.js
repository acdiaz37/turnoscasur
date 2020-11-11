import React, {useState, useEffect} from 'react';
import {db} from '../../firebase'
import NavBar from '../../components/NavBar'
import TurnosReloj from './TurnosReloj';
import ImagenComunicacion from '../ImagenComunicacion';
//import 

const Patallaturnos = () => {

    const obteniendoCurrentTurno =()=>{

        
        db.collection("currentTurno").doc('kL2PqaUA11gQLEzREwkc')
        .onSnapshot(function(doc){
            /* console.log('dentro de funcion')
            console.log(doc.data().currentTurno) */
            setcurrentTurnostate(doc.data().currentTurno)
        })
            
    }

    useEffect(() => {       

        obteniendoCurrentTurno()
        /* console.log("turnoactual")
        console.log(currentTurnostate) */
    }, [])

    const currentReloj =() =>{
        let now = new Date().toLocaleDateString()
        return(
            <span>{now}</span>
        )
    }

    const [currentTurnostate, setcurrentTurnostate] = useState()

    const [value, setValue] = useState(new Date());

    return ( <>
        <NavBar/>
        <div className="shadow container border border-danger mt-5"> 
            <div className="row">
                <div className="col-md-6 align-self-center d-flex justify-content-center">
                    <ImagenComunicacion/>
                </div>
                <div className="col-md-5">
                <div className="shadow bg-light card m-2">
                    <div>{currentReloj}</div>
                    <div className="card-header">
                        <h1 className="font-weight-bolder text-center">Sistema de Turnos - CASUR</h1>
                    </div>
                    <h2 className="mt-5 text-center">El turno actual es: </h2>
                    <h2 className="bg-success display-2 font-weight-bold text-center">
                        {currentTurnostate}
                    </h2>
                    <TurnosReloj/>
                    <p className="mt-5 p-3"><strong>**Recuerda!!,</strong> nuestra atención al usuario es de <strong>7:30 am a 4:30pm</strong> , si durante el horario laboral no tu turno no ha sido asignado, tu turno será atendido en el día hábil siguiente más próximo.</p>
                </div>
                </div>    
            </div>                       
        </div>
        
    </> );
}
 
export default Patallaturnos;