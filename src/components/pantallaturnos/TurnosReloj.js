import React, { useEffect, useState } from 'react';
import Clock from 'react-clock';

const TurnosReloj = () => {

    let time = new Date().toLocaleTimeString();
    
    const [ Ctime, setCtime] = useState(new Date());

    const updateTime  = () =>{
        time = new Date().toLocaleTimeString();
        setCtime(time);
    }
    setInterval (updateTime,1000);  

    return (<>
        <div className='text-center'>
            
            <h1>{time}</h1>
        </div>
    </>  );

}
 
export default TurnosReloj;