import styled from "styled-components";
import { useState, useContext } from "react";

import { ContexteGlut } from "../../../ContexteGlut";

const ModifLaMoyenne = ({ aliment, setModifierMoy }) => {

    const { f5, setF5 } = useContext(ContexteGlut);

    const [prixEntre, setPrixEntre] = useState();

    const maJPrix = (e) => {
        e.preventDefault();
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
    }

    const editionPrix = (e) => setPrixEntre(e.target.value);

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
                    step="0.01"
                    type="number"
                />
                <button type="submit">Mettre à jour</button>
            </Champs>
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

export default ModifLaMoyenne;