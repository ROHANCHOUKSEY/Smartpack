import React, { useState } from 'react'
import Smartpackcontext from './Smartpackcontext'

const Smartpackprovider = (props) => {

    const [userEmail, setUserEmail] = useState("");

    return (
        <Smartpackcontext.Provider value={{ userEmail, setUserEmail }}>
            {props.children}
        </Smartpackcontext.Provider>
    )
}

export default Smartpackprovider