import React, { useEffect, useState } from 'react'
import Smartpackcontext from './Smartpackcontext'

const Smartpackprovider = (props) => {

    const [isLoggined, setIsLoggined] = useState(JSON.parse(localStorage.getItem("isLoggined")) || false);
    const [selectGender, setSelectGender] = useState(localStorage.getItem("gender") || "Male");
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
        localStorage.setItem("isLoggined", JSON.stringify(isLoggined))
    }, [isLoggined]);

    useEffect(() => {
        localStorage.setItem("selectGender", selectGender);
    }, [selectGender]);

    return (
        <Smartpackcontext.Provider value={{ userEmail, setUserEmail, isLoggined, setIsLoggined, selectGender, setSelectGender}}>
            {props.children}
        </Smartpackcontext.Provider>
    )
}

export default Smartpackprovider 