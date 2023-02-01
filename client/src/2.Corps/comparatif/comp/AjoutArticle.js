import styled from "styled-components";
import { useState, useContext } from "react";

import { ContexteGlut } from "../../../ContexteGlut";

const AjoutArticle = ({ setAjoutArticle }) => {
    
    const { f5, setF5 } = useContext(ContexteGlut);

    const [alimentEntre, setAlimentEntre] = useState();
    const [prixEntre, setPrixEntre] = useState();

    const editionAliment = (e) => setAlimentEntre(e.target.value);
    const editionPrix = (e) => setPrixEntre(e.target.value);

    const envoyerAjout = (e) => {
        e.preventDefault();
        fetch(`/api/nouvelle-moyenne`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ alimentEntre, prixEntre, qteAchete: 0 })
        })
            .then(res => res.json())
            .then(() => {
                setF5(f5 + 1)
                setAjoutArticle(false)
            })
    }

    return (
        <Wrapper onSubmit={envoyerAjout}>
            <fieldset>
                <label htmlFor="articleAjout">Quel article souhaitez-vous ajouter dans la base de données?</label>
                <input
                    id="articleAjout"
                    onChange={editionAliment}
                    type="text"
                />
                <label htmlFor="prixAjout">Combien vous couterait cet article en moyenne si vous n'étiez pas atteinte de la maladie du cœliaque?</label>
                <input
                    id="prixAjout"
                    min="0"
                    onChange={editionPrix}
                    step="0.01"
                    type="number"
                />
                <button>Ajouter</button>
            </fieldset>
        </Wrapper>
    )
}

const Wrapper = styled.form`
    fieldset {
        align-items: center;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        text-align: center;
        input,
        button {
            max-width: 250px;
        }
    }
`

export default AjoutArticle;