import styled from "styled-components";
import { useState, useContext } from "react";

import ModifLaMoyenne from "./comp/ModifLaMoyenne";
import AjoutArticle from "./comp/AjoutArticle";
import { ContexteGlut } from "../../ContexteGlut";

const Comparatif = () => {

    const { baseComp, f5, setF5 } = useContext(ContexteGlut);

    const [modifierMoy, setModifierMoy] = useState("");
    const [ajoutArticle, setAjoutArticle] = useState(false);

    const toutesCles = baseComp[0];

    let toutesValeurs = [];
    baseComp[1].forEach(num => {
        let nombreArrondi = num.toLocaleString("fr-CA");
        let virgule = nombreArrondi.indexOf(",");
        if (virgule === -1) {
            nombreArrondi = nombreArrondi.concat(",00");
        } else {
            let chiffresApVirgule = nombreArrondi.length - virgule
            if (chiffresApVirgule === 2) {
                nombreArrondi = nombreArrondi.concat("0");
            }
        }
        toutesValeurs.push(nombreArrondi)
    });

    const modifierMoyenne = (aliment) => setModifierMoy(aliment);

    const supprimerMoyenne = (aliment) => {
        console.log("on va supprimer", aliment);
        fetch(`/api/supprimer-moyenne`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ aliment })
        })
            .then(res => res.json())
            .then(() => setF5(f5 + 1))
    }

    const basculeAjoutArticle = () => ajoutArticle ? setAjoutArticle(false) : setAjoutArticle(true);

    return (
        <Wrapper>
            <ul>
                {
                    toutesCles.map((item, index) => {
                        return (
                            <li key={index}>
                                <p>{item}</p>
                                <p>{toutesValeurs[index]}</p>
                                <button onClick={() => modifierMoyenne(item)}>Modifier moyenne</button>
                                <button onClick={() => supprimerMoyenne(item)}>Supprimer</button>
                            </li>
                        )
                    })
                }
            </ul>
            {
                modifierMoy !== "" &&
                    <ModifLaMoyenne aliment={modifierMoy} />
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
    li {
        background-color: var(--c4);
        display: flex;
        justify-content: space-between;
    }
`

const Ajouter = styled.button`

`

export default Comparatif;