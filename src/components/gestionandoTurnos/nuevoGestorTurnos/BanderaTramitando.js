import React, { useContext, useEffect } from 'react'
import {FormularioContext} from '../../../context/contextFormulario';
import {db} from '../../../firebase'


const BanderaTramitando = () => {

    useEffect(() => {
       // guardando1()
       // guardando2()
        
    }, [])

    const { setestadoTurno, nombreAsesor, setcurrentTurno,  currentTurno } = useContext(FormularioContext);

    const guardando1 = () =>{
        setestadoTurno(true);
            const extractCurrentTurno = currentTurno
            window.alert(typeof(currentTurno))
            window.alert(typeof(currentTurno.numeroDocumento))
            //console.log(currentTurno.data())
            /* .filter((turno) => turno.estadoSolicitud === "Sin Gestionar")
            .sort((a, b) => a.TurnoAsignado - b.TurnoAsignado)[0];         */
        

        const extractCurrentTurno2 ={
            ...extractCurrentTurno,
            estadoSolicitud:'Tramitando',
            asesorAsignado: nombreAsesor
        }        
        setcurrentTurno(extractCurrentTurno2)
    }

    const guardando2 = async() =>{
        await db
            .collection("datosturno")
            .doc(currentTurno.id)
            .set(currentTurno);
        
        const currentTurnotoDb = {
            currentTurno: currentTurno.TurnoAsignado,
        };
          
        await db
            .collection("currentTurno")
            .doc("kL2PqaUA11gQLEzREwkc")
            .set(currentTurnotoDb);
    }
    
    return (<>
        <h3>Tramitando...</h3>
    </>        
    )
}

export default BanderaTramitando
