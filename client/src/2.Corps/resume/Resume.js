import { useState, useEffect, useContext } from "react";

import { ContexteGlut } from "../../ContexteGlut";
import Tableau from "./comp/Tableau";
import Filtres from "../comp/Filtres";

const Resume = () => {

    const { baseComp } = useContext(ContexteGlut);
    const [filtrer, setFiltrer] = useState();
    const [manquants, setManquants] = useState(0);

    useEffect(() => {
        let oublis = 0;
        baseComp.forEach(element => {
            if (element.prix === 0 || element.prix === "0,00") oublis += 1;
        })
        setManquants(oublis);
    }, [baseComp])
    

    return (
        <>
            <h2>Tableau résumé</h2>
            <Filtres filtrer={filtrer} setFiltrer={setFiltrer} />
            {
                manquants === 1 &&
                <p>Attention, il y a un article sans prix de base. Votre montant admissible est plus bas que ce que vous verrez dans ce tableau.</p>
            }
            {
                manquants > 1 &&
                <p>Attention, il y a {manquants} articles sans prix de base. Votre montant admissible est plus bas que ce que vous verrez dans ce tableau.</p>
            }
            <Tableau filtrer={filtrer} />
        </>
    )
}

export default Resume;