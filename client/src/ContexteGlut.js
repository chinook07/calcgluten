import { createContext, useState, useEffect } from "react";

export const ContexteGlut = createContext();

const ContexteGlutProvider = ({ children }) => {

    const [prete, setPrete] = useState(false);
    const [tousRecus, setTousRecus] = useState([]);
    const [baseComp, setBaseComp] = useState();
    const [f5, setF5] = useState(0);

    useEffect(() => {
        fetch("/api/toutes-donnees")
            .then(res => res.json())
            .then((donnees) => {
                console.log(donnees);
                setTousRecus(donnees.items);
                setBaseComp(donnees.catalogue);
                setPrete(true);
                return donnees;
            })
    }, [f5])

    return (
        <ContexteGlut.Provider
            value={{
                prete,
                tousRecus,
                setTousRecus,
                baseComp,
                setBaseComp,
                f5,
                setF5
            }}
        >{children}</ContexteGlut.Provider>
    )
}

export default ContexteGlutProvider;