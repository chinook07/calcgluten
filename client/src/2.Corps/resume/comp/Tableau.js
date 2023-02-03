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
            element.admissible = (element.prixSG - element.prix) * element.achete;
            somme += element.admissible
        });
        setGrandTotal(somme)
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
                            return (
                                <tr key={index}>
                                    <td>{item.aliment}</td>
                                    <td>{item.achete}</td>
                                    <td>{item.prix}</td>
                                    {
                                        !isNaN(baseComp[0].prixSG) &&
                                        <td>{item.prixSG}</td>
                                    }
                                    <td>{item.prixSG - item.prix}</td>
                                    <td>{item.admissible}</td>
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