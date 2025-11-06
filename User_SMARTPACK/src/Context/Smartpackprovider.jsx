import React, { useEffect, useState } from 'react'
import Smartpackcontext from './Smartpackcontext'

const Smartpackprovider = (props) => {

    const [isLoggined, setIsLoggined] = useState(JSON.parse(localStorage.getItem("isLoggined")) || false);

    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
        localStorage.setItem("isLoggined", JSON.stringify(isLoggined))
    }, [isLoggined]);

    return (
        <Smartpackcontext.Provider value={{ userEmail, setUserEmail, isLoggined, setIsLoggined }}>
            {props.children}
        </Smartpackcontext.Provider>
    )
}

export default Smartpackprovider 