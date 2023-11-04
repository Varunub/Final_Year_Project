/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState } from "react";
import { useContext } from "react";

import React from "react";

export const MyContext=React.createContext();

// export const toggleLoginProvider=React.createContext();
export function MyProvider(props){
    const [login,setLogin]=useState(false)
    function toggleLogin(){
        setLogin((login==true)?false:true);
    }
    return (
        <MyContext.Provider value={[login,toggleLogin]}>
            {props.children}
        </MyContext.Provider>
    )
}

