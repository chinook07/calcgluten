import styled from "styled-components";
import { useState, useContext, useEffect } from "react";

import { ContexteGlut } from "../../../ContexteGlut";

const Tableau = () => {

    const { baseComp, tousRecus } = useContext(ContexteGlut);
    const [pret, setPret] = useState(false);
    const [grandTotal, setGrandTotal] = useState(0);

    useEffect(() => {
        let somme = 0;
        baseComp.forEach(element => {
            console.log(element);
            let paye = {qte: 0, unitaire: 0, total: 0};
            tousRecus.forEach(recu => {
                const match = recu.items.find(e => e.item === element.aliment)
                if (match !== undefined) {
                    paye.qte = parseInt(paye.qte) + parseInt(match.qte);
                    paye.total = parseFloat(paye.total) + parseFloat(match.prix);
                    paye.unitaire = paye.total / paye.qte;
                }
            })
            element.prixSG = paye.total / element.achete;
            element.totalSG = paye.total;
            element.admissible = (element.prixSG - parseFloat(element.prix)) * element.achete;
            somme += element.admissible
        });
        let sommeArr = somme.toFixed(2);
        sommeArr = sommeArr.replace(".", ",");
        setGrandTotal(sommeArr)
        console.log('baseComp', baseComp);
        setPret(true)
    }, [tousRecus])

    if (pret) {
        return (
            <Wrapper>
                <thead>
                    <tr>
                        <th>Produit</th>
                        <th>Qté.</th>
                        <th>Coût avec gluten</th>
                        <th>Coût sans gluten</th>
                        <th>Différentiel</th>
                        <th>Montant admissible</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        baseComp.map((item, index) => {
                            console.log(item.prix);
                            let prixVirgule;
                            if (typeof (item.prix) == "number") {
                                let prixArr = item.prix.toFixed(2);
                                prixVirgule = prixArr.replace(".", ",");
                            } else {
                                prixVirgule = item.prix
                            }
                            
                            let prixSGArr = item.prixSG.toFixed(2);
                            let prixSGVirgule = prixSGArr.replace(".", ",");
                            return (
                                <tr key={index}>
                                    <td>{item.aliment}</td>
                                    <td>{item.achete}</td>
                                    <td>{prixVirgule}</td>
                                    <td>{prixSGVirgule}</td>
                                    <td>{(item.prixSG - parseFloat(item.prix)).toFixed(2).replace(".", ",")}</td>
                                    <td>{item.admissible.toFixed(2).replace(".", ",")}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <th>Total</th>
                        <th aria-hidden></th>
                        <th aria-hidden></th>
                        <th aria-hidden></th>
                        <th aria-hidden></th>
                        <th>{grandTotal}</th>
                    </tr>
                </tfoot>
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
    }
`

export default Tableau;