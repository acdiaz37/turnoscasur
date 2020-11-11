import React from 'react'
import CardQueue from './CardQueue'
import NuevoGestiort from './NuevoGestiort'
import SolicitarTurnoSiguiente from './SolicitarTurnoSiguiente'

const IndexNuevoGestiont = () => {
    return (<>
        <CardQueue/>
        <SolicitarTurnoSiguiente/>
        <NuevoGestiort/>        
        </>
    )
}

export default IndexNuevoGestiont
