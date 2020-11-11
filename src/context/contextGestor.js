import React, {createContext, useState} from 'react'


export const GestorContext = createContext();

const GestorProvider = (props)=>{   

    const [paginadorGestorT, setpaginadorGestorT] = useState(2)   

return(
    <GestorContext.Provider
        value={{            
            paginadorGestorT, setpaginadorGestorT

        }}
    >
        {props.children}
    </GestorContext.Provider>
)

}

export default GestorProvider;


