import React, {createContext, useState} from 'react'


export const FormularioContext = createContext();

const FormularioProvider = (props)=>{

    const [formularioLleno, setformularioLleno] = useState(false)

    const [paginador, setpaginador] = useState(5)

    //const [paginadorGestorT, setpaginadorGestorT] = useState(1)

    const [datosFormulario, setdatosFormulario] = useState({
        'tipoIdentificacion' : 'Cedula de Ciudadania',
        'numeroDocumento' : '',
        'nombreCiudadano':'',
        'autorizaDatos' : 'Si',
        'correoElectronico':'',
        'numeroCelular':'',
        'tipoTurno':'',
        'TurnoAsignado':'',
        'descripcionSolicitud':'',
        'estadoSolicitud':'',
        'asesorAsignado':''
    })

    const [tipoTurno, settipoTurno] = useState([
        'Asignaciones',
        'Sustituciones',
        'Derecho de peticion',
    ])

    const [turnoSeleccionado, setturnoSeleccionado] = useState('')

    const [ultimoturno, setultimoturno] = useState('')

return(
    <FormularioContext.Provider
        value={{
            formularioLleno,setformularioLleno,
            datosFormulario, setdatosFormulario,
            tipoTurno, settipoTurno,
            paginador,setpaginador,
            turnoSeleccionado, setturnoSeleccionado,
            ultimoturno, setultimoturno,
            //paginadorGestorT, setpaginadorGestorT

        }}
    >
        {props.children}
    </FormularioContext.Provider>
)

}

export default FormularioProvider;


