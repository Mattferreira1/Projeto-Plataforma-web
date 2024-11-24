import { createContext, useState } from "react";

 export const context = createContext();

export const AuthContext = ({children})=>{
    const [logado, setLogado]= useState(false);
    return(
        <>
            <context.Provider value={{logado, setLogado}}>
                {children}
            </context.Provider>
        </>
    )
}