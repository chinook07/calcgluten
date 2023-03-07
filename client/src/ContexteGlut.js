import { createContext, useState, useEffect } from "react";
import { parseISO, compareDesc } from "date-fns";

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
                let tousRecusChrono = donnees.recus;
                tousRecusChrono.sort(function (a, b) {
                    return compareDesc(parseISO(a.date), parseISO(b.date))
                });
                setTousRecus(tousRecusChrono);
                donnees.catalogue.sort((c, d) => {
                    let nomC = c.aliment.toUpperCase();
                    let nomD = d.aliment.toUpperCase();
                    if (nomC < nomD) {
                        return -1
                    } else if (nomC > nomD) {
                        return 1
                    } else {
                        return 0
                    };
                });
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