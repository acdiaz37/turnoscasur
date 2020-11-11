import React, {createContext, useState} from 'react'


export const FormularioContext = createContext();

const FormularioProvider = (props)=>{

    const [formularioLleno, setformularioLleno] = useState(false)

    const [paginador, setpaginador] = useState(5)

    const [estadoTurno, setestadoTurno] = useState(false);

    const [paginadorGestor, setpaginadorGestor] = useState(1)

    const [datosFormulario, setdatosFormulario] = useState({
        'TurnoAsignado':'',
        'asesorAsignado':'',
        'autorizaDatos' : 'Si',   
        'comentarioRespuesta':'',
        'correoElectronico':'',
        'descripcionSolicitud':'',
        'estadoSolicitud':'Sin Gestionar',
        'fecha':'',
        'fechaRespuesta':'',
        'identificacionTitular':'',
        'nombreCiudadano':'',
        'numeroCelular':'',
        'numeroDocumento' : '',
        'numeroRadicado':'',
        'opcionRespuesta':'',
        'tipoAfiliacion': 'Titular Asignación',
        'tipoIdentificacion' : 'Cedula de Ciudadania',
        'tipoTurno':''        
    })

    const [tipoTurno, settipoTurno] = useState([        
        'Información pago de nómina y explicación de desprendibles',
        'Información sentencias y conciliaciones',
        'Información Libranzas y descuentos de nómina',
        'Solicitud copia doc. Prestacionales',
        'Información trámite asignación de retiro',
        'Activación de correo Institucional',
        'Actualización de datos',
        'Carnetizacion e info constancias sanidad',
        'Bienestar al afiliado',
        
    ])

    const [guardandoConsultaTurnos, setguardandoConsultaTurnos] = useState([])

    const [guardandoConsultaListaok, setguardandoConsultaListaok] = useState([])

    const [turnoSeleccionado, setturnoSeleccionado] = useState('')

    const [cantidadTurnos, setcantidadTurnos] = useState({})

    const [respuestaSeleccionada, setrespuestaSeleccionada] = useState('')

    const [ultimoturno, setultimoturno] = useState('')

    const [nombreAsesor, setnombreAsesor] = useState('')

    const [currentTurno, setcurrentTurno] = useState({})

    const [soloSinTramitar, setsoloSinTramitar] = useState([])

    const [tiporespuesta, settiporespuesta] = useState(
        [
            'Contestado Satisfactoriamente',
            'No responde a llamada',
            'Respuesta enviada por correo electrónico   '            
        ]
    )

    const [banderaTramitando, setbanderaTramitando] = useState(false)

return(
    <FormularioContext.Provider
        value={{
            formularioLleno,setformularioLleno,
            datosFormulario, setdatosFormulario,
            tipoTurno, settipoTurno,
            paginador,setpaginador,
            turnoSeleccionado, setturnoSeleccionado,
            ultimoturno, setultimoturno,
            paginadorGestor, setpaginadorGestor,
            nombreAsesor, setnombreAsesor,
            tiporespuesta, settiporespuesta,
            respuestaSeleccionada, setrespuestaSeleccionada,
            guardandoConsultaTurnos, setguardandoConsultaTurnos,
            currentTurno, setcurrentTurno,
            estadoTurno, setestadoTurno,
            cantidadTurnos, setcantidadTurnos,
            soloSinTramitar, setsoloSinTramitar,
            banderaTramitando, setbanderaTramitando,
            guardandoConsultaListaok, setguardandoConsultaListaok

        }}
    >
        {props.children}
    </FormularioContext.Provider>
)

}

export default FormularioProvider;


