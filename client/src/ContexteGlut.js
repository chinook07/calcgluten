import { createContext, useState, useEffect } from "react";

export const ContexteGlut = createContext();

const ContexteGlutProvider = ({ children }) => {

    const [prete, setPrete] = useState(false);

    useEffect(() => {
        fetch("/api/toutes-donnees")
            .then((res) => {
                console.log(res);
                return res.json()
            })
            .then((donnees) => {
                console.log(donnees);
                setPrete(true);
                return donnees;
            })
    }, [])

    return (
        <ContexteGlut.Provider
            value={{
                prete
            }}
        >{children}</ContexteGlut.Provider>
    )
}

export default ContexteGlutProvider;