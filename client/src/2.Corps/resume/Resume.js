import { useState, useEffect, useContext } from "react";

import { ContexteGlut } from "../../ContexteGlut";
import Tableau from "./comp/Tableau";
import Filtres from "../comp/Filtres";

const Resume = () => {

    const { baseComp, tousRecus } = useContext(ContexteGlut);
    const [filtrer, setFiltrer] = useState();
    const [manquants, setManquants] = useState(0);
    const [nonRentables, setNonRentables] = useState([]);
    const [recusAModifier, setRecusAModifier] = useState([]);

    useEffect(() => {
        let oublis = 0;
        let pasRentables = [];
        baseComp.forEach(element => {
            console.log(element);
            if (element.prix === 0 || element.prix === "0,00") oublis += 1;
            if (element.prixSG < element.prix) pasRentables.push(element);
        })
        setNonRentables(pasRentables);
        setManquants(oublis);
    }, [baseComp])
    
    useEffect(() => {
        let aModif = [];
        nonRentables.forEach((decision) => {
            tousRecus.forEach(recu => {
                recu.items.forEach(achat => {
                    if (achat.item === decision.aliment) aModif.push(recu)
                })
            })
        })
        setRecusAModifier(aModif);
    }, [nonRentables])

    return (
        <>
            <h2>Tableau résumé</h2>
            <Filtres filtrer={filtrer} setFiltrer={setFiltrer} />
            {
                manquants === 1 &&
                <p>Attention, il y a un article sans prix de base. Votre montant admissible pourrait être plus élevé.</p>
            }
            {
                manquants > 1 &&
                <p>Attention, il y a {manquants} articles sans prix de base. Votre montant admissible pourrait être plus élevé.</p>
            }
            {
                nonRentables.length === 1 &&
                <p>Attention, vous avez donné à l'article <em>{nonRentables[0].aliment}</em> un prix régulier supérieur au prix auquel vous l'avez acheté. Il ne sera pas pris en compte dans le calcul.</p>
            }
            {
                nonRentables.length > 1 &&
                <>
                    <p>Attention, vous avez donné aux articles suivants des prix réguliers supérieur au prix auquels vous les avez achetés. Ils ne seront pas pris en compte dans le calcul.</p>
                    <ul>
                        {
                            nonRentables.map((item, index) => {
                                return (
                                    <li key={index}>{item.aliment}</li>
                                )
                            })
                        }
                    </ul>
                </>
            }
            <Tableau filtrer={filtrer} />
        </>
    )
}

export default Resume;