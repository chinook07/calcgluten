import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ModifLaMoyenne from "./comp/ModifLaMoyenne";
import AjoutArticle from "./comp/AjoutArticle";
import { ContexteGlut } from "../../ContexteGlut";
import { faPenToSquare, faDumpster } from "@fortawesome/free-solid-svg-icons";

const Comparatif = () => {

    const { baseComp, f5, setF5 } = useContext(ContexteGlut);

    const [modifierMoy, setModifierMoy] = useState("");
    const [ajoutArticle, setAjoutArticle] = useState(false);
    const [prixManquants, setPrixManquants] = useState(0);

    useEffect(() => {
        let manquants = false;
        baseComp.forEach(item => {
            if (item.prix === "0,00") {
                manquants += 1;
            }
        })
        manquants && setPrixManquants(manquants);
    }, [baseComp])

    let catalogue = [];

    baseComp.forEach(article => {
        let nombreArrondi = article.prix.toLocaleString("fr-CA");
        let virgule = nombreArrondi.indexOf(",");
        if (virgule === -1) {
            nombreArrondi = nombreArrondi.concat(",00");
        } else {
            let chiffresApVirgule = nombreArrondi.length - virgule
            if (chiffresApVirgule === 2) {
                nombreArrondi = nombreArrondi.concat("0");
            }
        }
        article.prix = nombreArrondi;
        catalogue.push(article);
    })

    const modifierMoyenne = (aliment) => {
        setModifierMoy(aliment);
        setAjoutArticle(false);
    };

    const supprimerMoyenne = (aliment) => {
        fetch(`/api/supprimer-moyenne`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ aliment })
        })
            .then(res => res.json())
            .then(() => setF5(f5 + 1))
    }

    const basculeAjoutArticle = () => {
        setModifierMoy("")
        ajoutArticle ? setAjoutArticle(false) : setAjoutArticle(true)
    };

    return (
        <>
            {
                prixManquants > 0 &&
                <p>Attention, il manque {prixManquants} prix.</p>
            }
            <Toutes>
                {
                    catalogue.map((item, index) => {
                        return (
                            <li key={index}>
                                <p>{item.aliment}</p>
                                <p>{item.achete}</p>
                                <Complet prix={item.prix}>{item.prix} $</Complet>
                                <button onClick={() => modifierMoyenne(item)}>
                                    <span>Modifier</span>
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </button>
                                {
                                    item.achete === 0
                                        ? <button onClick={() => supprimerMoyenne(item.aliment)}>
                                            <span>Supprimer</span>
                                            <FontAwesomeIcon icon={faDumpster} />
                                        </button>
                                        : <button disabled>
                                            <span>Supprimer</span>
                                            <FontAwesomeIcon icon={faDumpster} />
                                        </button>
                                }
                            </li>
                        )
                    })
                }
            </Toutes>
            {
                modifierMoy !== "" &&
                    <ModifLaMoyenne aliment={modifierMoy} setModifierMoy={setModifierMoy} />
            }
            <Ajouter onClick={basculeAjoutArticle}>Ajouter un article comparatif</Ajouter>
            {
                ajoutArticle &&
                    <AjoutArticle setAjoutArticle={setAjoutArticle} />
            }
        </>
    )
}

const Toutes = styled.ul`
    padding: 0;
    li {
        align-items: center;
        display: grid;
        grid-template-columns: 30% 25px 55px 100px 110px;
        justify-content: space-between;
        padding: 5px 10px;
        &:nth-child(odd) {
            background-color: var(--c3);
        }
        &:nth-child(even) {
            background-color: var(--c4);
        }
        p {
            margin: 10px 0;
        }
        button {
            display: flex;
            justify-content: space-between;
            padding: 5px 10px;
        }
        @media screen and (max-width: 520px) {
            grid-template-columns: 30% 25px 55px 40px 40px;
            button {
                justify-content: center;
                span {
                    display: none;
                }
            }
        }
    }
`

const Complet = styled.p`
    color: ${props => props.prix === "0,00" && "red"};
    font-weight: ${props => props.prix === "0,00" && "bold"};
`

const Ajouter = styled.button`
    background-color: var(--c4);
    border: 1px solid var(--c3);
    cursor: pointer;
    display: block;
    margin: 15px auto;
    padding: 5px 10px;
    &:hover {
        transform: scale(1.1);
    }
`

export default Comparatif;