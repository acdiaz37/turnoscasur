import { useState } from 'react';
import {useContext} from 'react';
import {FormularioContext} from '../../context/contextFormulario';
import {db} from '../../firebase';

const useConsultaCantidadTurnos = () => {

        const {setcantidadTurnos, cantidadTurnos } = useContext(FormularioContext);            
        

        //funcion que esta escuchando el cambio de cantidad de turnos de firebase
        const consultandoDbCantidad = () =>{
           //window.alert('si entro a constular')
            db.collection("cantidadTurnos").doc('LNdH11d8MCstoTwoHeEe')
               .onSnapshot(function(doc){                
                setcantidadTurnos(doc.data())
                   
           })
        }

        const consultaDBturnos = ()=>{
            consultandoDbCantidad()            
        }

        const sumarok = () =>{
            window.alert("se sumo un ok")
            setcantidadTurnos ({
                ...cantidadTurnos,                
                ok: (cantidadTurnos.ok)+1
            })
        }

        const sumarTramitando = (parasumar) =>{
            window.alert("se sumo un tramitando")
            window.alert(parasumar)
            setcantidadTurnos ({
                ...cantidadTurnos,                
                ok: (cantidadTurnos.Tramitando)+1
            })
        }

        const sumarSinGestionar = () =>{
            window.alert("se sumo un sin gestionar")
            setcantidadTurnos ({
                ...cantidadTurnos,                
                ok: (cantidadTurnos.SinGestionar)+1
            })
        }
        const restarok = () =>{
            window.alert("se resto un ok")
            setcantidadTurnos ({
                ...cantidadTurnos,                
                ok: (cantidadTurnos.ok)-1
            })
        }
        const restarTramitando = () =>{
            window.alert("se resto un tramitando")
            setcantidadTurnos ({
                ...cantidadTurnos,                
                ok: (cantidadTurnos.Tramitando)-1
            })
        }
        const restarSinGestionar = (parasumar) =>{
            window.alert("se resto un gestionando")
            window.alert(parasumar)
            setcantidadTurnos ({
                ...cantidadTurnos,                
                ok: (cantidadTurnos.SinGestionar)-1
            })
        }
    
    

    return [
        consultandoDbCantidad,
        consultaDBturnos,
        sumarok,
        sumarTramitando,
        sumarSinGestionar,
        restarok,
        restarTramitando,
        restarSinGestionar
    ]
}

export default useConsultaCantidadTurnos

    

