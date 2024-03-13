import styled from "styled-components";
import { useState, useContext } from "react";

import { ContexteGlut } from "../../../ContexteGlut";

const ModifLaMoyenne = ({ aliment, setModifierMoy }) => {

    const { f5, setF5 } = useContext(ContexteGlut);

    const [prixEntre, setPrixEntre] = useState();
    const [prixManquant, setPrixManquant] = useState(false);

    const baseURL = process.env.NODE_ENV === 'production' ? 'https://calcgluten.onrender.com/api' : 'http://localhost:8000/api';

    const maJPrix = (e) => {
        e.preventDefault();
        if (prixEntre !== undefined && prixEntre !== "") {
            fetch(`/api/modifier-moyenne`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ aliment, prixEntre })
            })
                .then(res => res.json())
                .then(() => {
                    setF5(f5 + 1)
                    setModifierMoy("");
                })
        } else {
            setPrixManquant(true);
        }
    }

    const touchePese = (f) => { if (f.key === "Enter") maJPrix(f) }

    const editionPrix = (e) => {
        setPrixEntre((parseFloat(e.target.value)).toFixed(2));
        setPrixManquant(false);
    };

    const fermerBoite = (e) => {
        e.preventDefault();
        setModifierMoy("");
    }

    return (
        <form onSubmit={maJPrix}>
            <Fermer onClick={fermerBoite}>Fermer</Fermer>
            <p>En moyenne, combien vous coûterait le prix de l'article <Gras>{aliment.aliment}</Gras> si vous n'étiez pas atteint-e de la maladie de coéliaque?</p>
            <Champs>
                <label>Prix avant la « taxe sans gluten » :</label>
                <input
                    min="0"
                    onChange={editionPrix}
                    onKeyDown={touchePese}
                    step="0.01"
                    type="number"
                />
                <button type="submit">Mettre à jour</button>
            </Champs>
            {
                prixManquant &&
                <TexteErr>Veuillez entrer un prix.</TexteErr>
            }
        </form>
    )
}

const Champs = styled.fieldset`
    align-items: center;
    border: 1px solid var(--c2);
    border-radius: 10px;
    display: flex;
    gap: 10px;
    input {
        padding: 5px 10px;
        width: 90px;
    }
    button {
        padding: 5px 10px;
    }
    @media screen and (max-width: 550px) {
        flex-direction: column;
    }
`

const Fermer = styled.button`
    display: block;
    margin: 0 0 0 auto;
    padding: 5px 10px;
    text-align: right;
`

const Gras = styled.span`
    font-weight: bold;
`

const TexteErr = styled.p`
    color: red;
`

export default ModifLaMoyenne;