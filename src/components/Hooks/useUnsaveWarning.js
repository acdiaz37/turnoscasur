import React, {useState, useEffect} from 'react'
import {Prompt} from 'react-router-dom';

const useUnsaveWarning = (
    message = "Va salir sin gestionar un turno, ¿desea continuar?"

) => {
    const [isDirty, setisDirty] = useState(false)
    
    useEffect(() => {
        
        //detectando cuando cierra el componente
        window.onbeforeunload = isDirty && (()=> message);

        return () => {
            window.onbeforeunload = null;
        }
    }, [isDirty])

    const routerPromt = <Prompt when={isDirty} message={message} />

    return [routerPromt, ()=> setisDirty(true), ()=> setisDirty(false)]
}

export default useUnsaveWarning
