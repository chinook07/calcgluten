import styled from "styled-components";
import { useState, useEffect, useContext } from "react";

import SelectLettres from "./comp/SelectLettres";
import TousArticles from "./comp/TousArticles";
import ModifLaMoyenne from "./comp/ModifLaMoyenne";
import AjoutArticle from "./comp/AjoutArticle";
import { ContexteGlut } from "../../ContexteGlut";

const Comparatif = () => {

    const { baseComp, f5, setF5 } = useContext(ContexteGlut);

    const [montrerLettres, setMontrerLettres] = useState(["a", "b", "c", "d", "e", "f"]);
    const [modifierMoy, setModifierMoy] = useState("");
    const [ajoutArticle, setAjoutArticle] = useState(false);
    const [prixManquants, setPrixManquants] = useState(0);

    useEffect(() => {
        let manquants = false;
        baseComp.forEach(item => {
            if (item.prix === 0) {
                manquants += 1;
            }
        })
        manquants && setPrixManquants(manquants);
    }, [baseComp])

    const baseURL = process.env.NODE_ENV === 'production' ? 'https://calcgluten.onrender.com/api' : 'http://localhost:8000/api';

    let catalogue = [];

    baseComp.forEach(article => {
        if (article.aliment === "test") console.log(article);
        let nombreArrondi = article.prix.toLocaleString("fr-CA");
        let virgule = nombreArrondi.indexOf(",");
        let chiffresApVirgule;
        if (virgule === -1) {
            nombreArrondi = nombreArrondi.concat(",00");
        } else {
            chiffresApVirgule = nombreArrondi.length - virgule
            if (chiffresApVirgule === 2) {
                nombreArrondi = nombreArrondi.concat("0");
            }
        }
        article.prixLocale = nombreArrondi;
        catalogue.push(article);
    })

    const identifiants = ["lettres1", "lettres2", "lettres3", "lettres4"]

    const changerLettres = (lettres, identifiant) => {
        setMontrerLettres(lettres);
        identifiants.forEach(bouton => {
            document.getElementById(bouton).className = ""
        });
        document.getElementById(identifiant).className = "actif";
    }

    const modifierMoyenne = (aliment) => {
        setModifierMoy(aliment);
        setAjoutArticle(false);
        window.scrollTo({ left: 0, top: 100000, behavior: "smooth"});
    };

    const supprimerMoyenne = (aliment) => {
        fetch(`${baseURL}/supprimer-moyenne`, {
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
            <p>Pour déclarer un montant total aux impôts, il faut d'abord calculer le prix que vous coûterait chaque aliment si vous n'étiez pas atteinte de la maladie de coéliaque. Au fur et à mesure que vous ajouteriez vos aliments sans gluten, il vous faudra indiquer le coût d'un item comparable. Oui, on sait... c'est compliqué!</p>
            {
                prixManquants > 0 &&
                <p>Attention, il manque {prixManquants} prix.</p>
            }
            <SelectLettres changerLettres={changerLettres} />
            <TousArticles
                catalogue={catalogue}
                modifierMoyenne={modifierMoyenne}
                montrerLettres={montrerLettres}
                supprimerMoyenne={supprimerMoyenne}
            />
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