import styled from "styled-components";
import { useState, useContext } from "react";

import { ContexteGlut } from "../../../ContexteGlut";

const ModifLaMoyenne = ({ aliment }) => {

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
            .then(() => setF5(f5 + 1))
    }

    const editionPrix = (e) => setPrixEntre(e.target.value);

    return (
        <Wrapper>
            <p>En moyenne, combien vous coûterait le prix de l'article <Gras>{aliment.aliment}</Gras> si vous n'étiez pas atteint-e de la maladie de coéliaque?</p>
            <form onSubmit={maJPrix}>
                <label>Prix avant la « taxe sans gluten » :</label>
                <input
                    min="0"
                    onChange={editionPrix}
                    step="0.01"
                    type="number"
                />
            </form>
        </Wrapper>
    )
}

const Wrapper = styled.div``

const Gras = styled.span`
    font-weight: bold;
`

export default ModifLaMoyenne;