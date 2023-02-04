import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import { getYear, parseISO } from "date-fns";

import { ContexteGlut } from "../../../ContexteGlut";
import TeteTab from "./TeteTab";
import CorpsTab from "./CorpsTab";
import PiedTab from "./PiedTab";

const Tableau = ({ filtrer }) => {
    
    const { baseComp, tousRecus } = useContext(ContexteGlut);
    const [pret, setPret] = useState(false);
    const [grandTotal, setGrandTotal] = useState(0);

    useEffect(() => {
        let somme = 0;
        baseComp.forEach(element => {
            let paye = { qte: 0, unitaire: 0, total: 0 };
            let declarable = 0;
            tousRecus.forEach(recu => {
                if ((filtrer !== undefined && getYear(parseISO(recu.date)) === filtrer) || filtrer === undefined) {
                    const match = recu.items.find(e => e.item === element.aliment);
                    if (match !== undefined) {
                        paye.qte = parseInt(paye.qte) + parseInt(match.qte);
                        // console.log(paye.qte, match);
                        paye.total = parseFloat(paye.total) + parseFloat(match.prix) * match.qte;
                        paye.unitaire = paye.total / paye.qte;
                        declarable += (paye.unitaire - parseFloat(element.prix)) * match.qte;
                    }
                }
                
            })
            element.qteAnnee = paye.qte
            element.prixSG = paye.unitaire;
            element.totalSG = paye.total;
            element.admissible = declarable;
            if (!isNaN(element.admissible)) somme += element.admissible;
        });
        let sommeArr = somme.toFixed(2);
        sommeArr = sommeArr.replace(".", ",");
        setGrandTotal(sommeArr)
        setPret(true)
    }, [tousRecus, filtrer])

    if (pret) {
        return (
            <Wrapper>
                <TeteTab />
                <CorpsTab baseComp={baseComp} />
                <PiedTab grandTotal={grandTotal} />
            </Wrapper>
        )
    } else {
        return (
            <>
                <div>En chargement</div>
            </>
        )
    }
}

const Wrapper = styled.table`
    border: solid black 1px;
    td {
        border: 1px solid gray;
        padding: 5px;
        &:not(:first-child) {
            text-align: right;
        }
    }
`



export default Tableau;