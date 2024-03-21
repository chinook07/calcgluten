import styled from "styled-components";
import { useState, useContext } from "react";

import { ContexteGlut } from "../../../ContexteGlut";

const ModifLaMoyenne = ({ aliment, setModifierMoy }) => {

    const { f5, setF5 } = useContext(ContexteGlut);

    const [prixEntre, setPrixEntre] = useState();
    const [prixManquant, setPrixManquant] = useState(false);
    const [renommerArticle, setRenommerArticle] = useState(false);
    const [nomEntre, setNomEntre] = useState("");

    const baseURL = process.env.NODE_ENV === 'production' ? 'https://calcgluten.onrender.com/api' : 'http://localhost:8000/api';

    const maJPrix = (e) => {
        e.preventDefault();
        if (prixEntre !== undefined && prixEntre !== "") {
            fetch(`${baseURL}/modifier-moyenne`, {
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

    const maJNom = (e) => {
        e.preventDefault();
        if (nomEntre !== "") {
            console.log("nom changé pour", nomEntre);
            
            fetch(`${baseURL}/nouveau-nom`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ aliment, nomEntre })
            })
                .then((res) => res.json)
                .then(() => {
                    setRenommerArticle(false);
                    setModifierMoy("");
                    setF5(f5 + 1);
                })

        }
    }

    const touchePese = (f) => { if (f.key === "Enter") maJPrix(f) }

    const editionPrix = (e) => {
        setPrixEntre((parseFloat(e.target.value)).toFixed(2));
        setPrixManquant(false);
    };

    const editionNom = (e) => {
        setNomEntre(e.target.value);
    }

    const handleRenommer = () => {
        renommerArticle ? setRenommerArticle(false) : setRenommerArticle(true);
    }

    return (
        <Wrapper onSubmit={maJPrix}>
            <p>
                <span>En moyenne, combien vous coûterait le prix de l'article </span>
                <Gras>{aliment.aliment}</Gras>
                <span> </span>
                {/* {
                    renommerArticle
                        ? <ChangerNom onClick={handleRenommer} type="reset">Annuler</ChangerNom>
                        : <ChangerNom onClick={handleRenommer}>Renommer</ChangerNom>
                }
                <span> </span>
                {
                    renommerArticle && <>
                        <input onChange={editionNom} placeholder="nouveau nom" />
                        <span> </span>
                        <ChangerNom onClick={maJNom} type="submit">Sauvegarder</ChangerNom>
                        <span> </span>
                    </>
                } */}
                <span>si vous n'étiez pas atteint-e de la maladie de coéliaque?</span>
            </p>
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
        </Wrapper>
    )
}

const Wrapper = styled.form`
    background-color: var(--c4);
    padding: 10px;
`

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

const ChangerNom = styled.button``

const Gras = styled.span`
    font-weight: bold;
`

const TexteErr = styled.p`
    color: red;
`

export default ModifLaMoyenne;