import styled from "styled-components";
import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ContexteGlut } from "../../../ContexteGlut";
import { faServer } from "@fortawesome/free-solid-svg-icons";

const NouvelItem = ({ recu, setAjoutItem }) => {

    const { baseComp, f5, setF5 } = useContext(ContexteGlut);
    const [entreeQte, setEntreeQte] = useState(0);
    const [entreeItem, setEntreeItem] = useState("");
    const [entreePrix, setEntreePrix] = useState(0);
    const [infoManquante, setInfoManquante] = useState(false);
    const [custom, setCustom] = useState(false);

    const baseURL = process.env.NODE_ENV === 'production' ? 'https://calcgluten.onrender.com/api' : 'http://localhost:8000/api';

    const majItems = (e) => {
        setInfoManquante(false);
        e.target.id === "qteItem" && setEntreeQte(e.target.value);
        e.target.id === "customItem" && setEntreeItem(e.target.value);
        e.target.id === "prixItem" && setEntreePrix(e.target.value);
        if (e.target.id === "nomItem") {
            if (e.target.value !== "Autre") {
                setCustom(false);
                setEntreeItem(e.target.value)
            } else {
                setCustom(true);
            }
        }
    }

    const envoyerAjout = (e) => {
        e.preventDefault();
        if ((custom && !entreeItem) || entreePrix === 0 || entreeQte === 0) {
            setInfoManquante(true);
        } else {
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
                    fetch(`${baseURL}/augmenter-inventaire`, {
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
                .then(() => {
                    setAjoutItem(false);
                    setF5(f5 + 1);
                })
        }
        
    }

    return (
        <Wrapper onSubmit={envoyerAjout}>
            <fieldset>
                <ObjetAchete>
                    <label htmlFor="nomItem">Item acheté :</label>
                    <select
                        id="nomItem"
                        onChange={majItems}
                    >
                        {
                            baseComp.map((item, index) => {
                                return (
                                    <option key={index}>{item.aliment}</option>
                                )
                            })
                        }
                        <option>Autre</option>
                    </select>
                    {
                        custom &&
                        <input
                            id="customItem"
                            onChange={majItems}
                            placeholder="item acheté"
                            type="text"
                        />
                    }
                </ObjetAchete>
                <ObjetChiffres>
                    <div>
                        <label htmlFor="qteItem">Qté</label>
                        <input
                            id="qteItem"
                            onChange={majItems}
                            type="number"
                        />
                    </div>
                    <div>
                        <label htmlFor="prixItem">Prix</label>
                        <input
                            id="prixItem"
                            min="0"
                            onChange={majItems}
                            step="0.01"
                            type="number"
                        />
                    </div>
                </ObjetChiffres>
                <button type="submit">
                    <span>Sauvegarder</span>
                    <FontAwesomeIcon icon={faServer} />
                </button>
                {
                    infoManquante &&
                    <TexteErr>Information manquante</TexteErr>
                }
            </fieldset>
        </Wrapper>
    )
}

const Wrapper = styled.form`
    padding: 5px;
    fieldset {
        border: 1px solid var(--c1);
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        gap: 15px;
        padding: 15px;
        button {
            display: flex;
            gap: 5px;
            justify-content: space-around;
            margin: 0 auto;
            padding: 5px;
            width: 150px;
        }
    }
`

const ObjetAchete = styled.div`
    align-items: center;
    display: flex;
    gap: 15px;
    justify-content: center;
    label {
        color: var(--c11);
    }
    select {
        border-radius: 10px;
        padding: 5px;
    }
    input {
        padding: 5px;
    }
    @media screen and (max-width: 555px) {
        flex-direction: column;
        gap: 10px;
    }
`

const ObjetChiffres = styled.div`
    align-items: center;
    display: flex;
    gap: 10px;
    justify-content: space-evenly;
    div {
        align-items: center;
        display: flex;
        gap: 10px;
        label {
            color: var(--c11);
        }
        input {
            padding: 5px;
            width: 100px;
        }
    }
`

const TexteErr = styled.p`
    color: pink;
    font-weight: bold;
    text-align: center;
`

export default NouvelItem;