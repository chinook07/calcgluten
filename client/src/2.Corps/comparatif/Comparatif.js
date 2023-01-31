import styled from "styled-components";
import { useState, useContext } from "react";

import ModifLaMoyenne from "./comp/ModifLaMoyenne";
import AjoutArticle from "./comp/AjoutArticle";
import { ContexteGlut } from "../../ContexteGlut";

const Comparatif = () => {

    const { baseComp, f5, setF5 } = useContext(ContexteGlut);

    const [modifierMoy, setModifierMoy] = useState("");
    const [ajoutArticle, setAjoutArticle] = useState(false);

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
        console.log("on va supprimer", aliment);
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
        <Wrapper>
            <ul>
                {
                    catalogue.map((item, index) => {
                        return (
                            <li key={index}>
                                <p>{item.aliment}</p>
                                <p>{item.achete}</p>
                                <p>{item.prix} $</p>
                                <button onClick={() => modifierMoyenne(item)}>Modifier</button>
                                {
                                    item.achete === 0
                                        ? <button onClick={() => supprimerMoyenne(item.aliment)}>Supprimer</button>
                                        : <button disabled>Supprimer</button>
                                }
                            </li>
                        )
                    })
                }
            </ul>
            {
                modifierMoy !== "" &&
                    <ModifLaMoyenne aliment={modifierMoy} setModifierMoy={setModifierMoy} />
            }
            <Ajouter onClick={basculeAjoutArticle}>Ajouter un article comparatif</Ajouter>
            {
                ajoutArticle &&
                    <AjoutArticle setAjoutArticle={setAjoutArticle} />
            }
        </Wrapper>
    )
}

const Wrapper = styled.div`
    ul {
        padding: 0;
    }
    li {
        align-items: center;
        display: grid;
        grid-template-columns: 30% 50px 50px 90px 90px;
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
            height: 25px;
        }
    }
`

const Ajouter = styled.button`
    background-color: var(--c4);
    border: 1px solid var(--c3);
    border-radius: 10px;
    cursor: pointer;
    display: block;
    margin: 15px auto;
    padding: 5px 10px;
    &:hover {
        transform: scale(1.1);
    }
`

export default Comparatif;