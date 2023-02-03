import styled from "styled-components";
import { useState, useContext } from "react";

import { ContexteGlut } from "../../../ContexteGlut";

const ModifLaMoyenne = ({ aliment, setModifierMoy }) => {

    const { f5, setF5 } = useContext(ContexteGlut);

    const [prixEntre, setPrixEntre] = useState();

    const maJPrix = (e) => {
        e.preventDefault();
        console.log("Formulaire envoyé");
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
        <Wrapper onSubmit={maJPrix}>
            <Fermer onClick={fermerBoite}>Fermer</Fermer>
            <p>En moyenne, combien vous coûterait le prix de l'article <Gras>{aliment.aliment}</Gras> si vous n'étiez pas atteint-e de la maladie de coéliaque?</p>
            <fieldset>
                <label>Prix avant la « taxe sans gluten » :</label>
                <input
                    min="0"
                    onChange={editionPrix}
                    step="0.01"
                    type="number"
                />
                <button type="submit">Mettre à jour</button>
            </fieldset>
        </Wrapper>
    )
}

const Wrapper = styled.form``

const Fermer = styled.button`
    display: block;
    margin: 0 0 0 auto;
    text-align: right;
`

const Gras = styled.span`
    font-weight: bold;
`

export default ModifLaMoyenne;