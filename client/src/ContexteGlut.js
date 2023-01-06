import { createContext, useState, useEffect } from "react";

export const ContexteGlut = createContext();

const ContexteGlutProvider = ({ children }) => {

    const [prete, setPrete] = useState(false);
    const [tousRecus, setTousRecus] = useState([]);

    useEffect(() => {
        fetch("/api/toutes-donnees")
            .then(res => res.json())
            .then((donnees) => {
                setTousRecus(donnees.items);
                setPrete(true);
                return donnees;
            })
    }, [])

    return (
        <ContexteGlut.Provider
            value={{
                prete,
                tousRecus
            }}
        >{children}</ContexteGlut.Provider>
    )
}

export default ContexteGlutProvider;