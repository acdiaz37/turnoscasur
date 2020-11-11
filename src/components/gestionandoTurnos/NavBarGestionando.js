import React, {useContext} from 'react';
import {FormularioContext} from '../../context/contextFormulario';
import {db} from '../../firebase'

const NavBarGestionando = () => {
    
    const { paginadorGestor, setpaginadorGestor, nombreAsesor, setguardandoConsultaListaok, guardandoConsultaListaok} = useContext(FormularioContext);
    
    const saliendoBoton = () =>{
        setpaginadorGestor(1)
    }

    const toHistoricos = () =>{
        setpaginadorGestor(4)
    }

    const toListaSinGestionar = () =>{
        setpaginadorGestor(6)
        trayendodatos()
    }

    const toListaTramitadosOk = () =>{
        setpaginadorGestor(7)
        trayendodatos()
    }

    const trayendodatos = () => {

        //console.log('entro a funcion a traer datos')
        try {
          db.collection("datosturno")
          .orderBy("TurnoAsignado",'desc')
          .limit(80)
          .onSnapshot(
              (querySnapshot)=>{
                  const docs = []
                  querySnapshot.forEach(doc =>{                       
                    docs.push(
                        {...doc.data(), id:doc.id})
                })
                setguardandoConsultaListaok(docs)
              }
          )
              
                  
                        
        } catch (error) {
           console.log(error)
        }
      
    }
    

    return ( <>
    <nav className="navbar navbar-dark bg-light border border-dark">
        <a className="text-dark navbar-brand font-weight-bolder disabled" href="#">
        <span role="img" aria-label="paper">📃</span> GESTIONANDO TURNOS</a>
        {paginadorGestor != 1 && <>
        <form className='form-inline'>
        {paginadorGestor === 3 && <>
            <a onClick={toListaSinGestionar} className="shadow btn btn-outline-danger ">Lista Sin Gestionar Max.20</a>
            <a onClick={toListaTramitadosOk} className="shadow btn btn-outline-success pull-right mr-5">Lista Tramitados ok Max.50</a>

        <a onClick={toHistoricos} className="shadow btn btn-outline-dark pull-right mr-5">Históricos</a> 
        </>
        }
        
        <h4 className="text-danger pull-right mr-4 text-capitalize">
        <span role="img" aria-label="Hola">👋</span>
            Hola, {nombreAsesor}</h4>                
        <a onClick={saliendoBoton} className="shadow btn btn-danger pull-right">Salir</a>
        </form>
        </>}        
    </nav>
    </> );
}
 
export default NavBarGestionando;