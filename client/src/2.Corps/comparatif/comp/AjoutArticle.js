import styled from "styled-components";
import { useState, useContext } from "react";

import { ContexteGlut } from "../../../ContexteGlut";

const AjoutArticle = ({ setAjoutArticle }) => {
    
    const { f5, setF5 } = useContext(ContexteGlut);

    const [alimentEntre, setAlimentEntre] = useState();
    const [prixEntre, setPrixEntre] = useState();

    const baseURL = process.env.NODE_ENV === 'production' ? 'https://calcgluten.onrender.com/api' : 'http://localhost:8000/api';

    const editionAliment = (e) => setAlimentEntre(e.target.value);
    const editionPrix = (e) => setPrixEntre(e.target.value);

    const envoyerAjout = (e) => {
        e.preventDefault();
        fetch(`${baseURL}/nouvelle-moyenne`, {
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
        <form onSubmit={envoyerAjout}>
            <Champs>
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
            </Champs>
        </form>
    )
}

const Champs = styled.fieldset`
    align-items: center;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    text-align: center;
    input,
    button {
        max-width: 250px;
        padding: 5px 10px;
    }
`

export default AjoutArticle;