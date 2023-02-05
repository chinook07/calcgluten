import styled from "styled-components";
import { useState, useContext } from "react";

import { ContexteGlut } from "../../../ContexteGlut";

const NouvelItem = ({ recu }) => {

    const { f5, setF5 } = useContext(ContexteGlut);
    const [entreeQte, setEntreeQte] = useState(0);
    const [entreeItem, setEntreeItem] = useState(0);
    const [entreePrix, setEntreePrix] = useState(0);

    const majItems = (e) => {
        e.target.id === "qteItem" && setEntreeQte(e.target.value);
        e.target.id === "nomItem" && setEntreeItem(e.target.value);
        e.target.id === "prixItem" && setEntreePrix(e.target.value);
    }

    const envoyerAjout = (e) => {
        e.preventDefault();
        console.log("envoyez");
        fetch(`/api/ajouter-item-achete`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                recuAModifier: recu._id,
                qte: parseInt(entreeQte),
                item: entreeItem,
                prix: parseFloat(entreePrix)
            })
        })
            .then(() =>
                fetch("/api/augmenter-inventaire", {
                    method: "PUT",
                    body: JSON.stringify({
                        qte: parseInt(entreeQte),
                        item: entreeItem
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                }))
            .then(res => res.json())
            .then(req => {
                if (req.ajoute === false) {
                    console.log("ajouter");
                    fetch(`/api/nouvelle-moyenne`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        },
                        body: JSON.stringify({
                            alimentEntre: entreeItem,
                            prixEntre: 0,
                            qteAchete: parseInt(entreeQte)
                        })
                    })
                        .then(res => res.json())
                }
            })
            .then(() => setF5(f5 + 1))
    }

    return (
        <Wrapper onSubmit={envoyerAjout}>
            <p>{entreeQte}, {entreeItem}, {entreePrix}</p>
            <fieldset>
                <input
                    id="qteItem"
                    onChange={majItems}
                    type="number"
                />
                
                <input
                    id="nomItem"
                    onChange={majItems}
                    type="texte"
                />
                <input
                    id="prixItem"
                    min="0"
                    onChange={majItems}
                    step="0.01"
                    type="number"
                />
                <button type="submit">Ajouter</button>
            </fieldset>
        </Wrapper>
    )
}

const Wrapper = styled.form``

export default NouvelItem;