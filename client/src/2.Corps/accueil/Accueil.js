import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { ExternalLink } from "react-external-link";
import { Link } from "react-router-dom";

import { ContexteGlut } from "../../ContexteGlut";
import Derniers from "./comp/Derniers";
import TousDerniers from "./comp/TousDerniers";

const Accueil = () => {

    const { baseComp, f5, setF5 } = useContext(ContexteGlut);
    const [SuppAAnnuler, setSuppAAnnuler] = useState(JSON.parse(localStorage.getItem("annuler")));

    useEffect(() => {
        localStorage.setItem("annuler", JSON.stringify(SuppAAnnuler))
    }, [SuppAAnnuler])

    const baseURL = process.env.NODE_ENV === 'production' ? 'https://calcgluten.onrender.com/api' : 'http://localhost:8000/api';

    const annulSupp = () => {
        let dejaAchete = [];
        let pasDejaAchete = [];
        SuppAAnnuler.items.forEach((item, index) => {
            let nouvelAchat = true;
            baseComp.forEach(i => {
                if (i.aliment === item.item) {
                    dejaAchete.push({ id: i._id, qtePlus: parseInt(item.qte) });
                    nouvelAchat = false;
                }
            })
            if (nouvelAchat === true) {
                pasDejaAchete.push({
                    aliment: item.item,
                    prix: 0,
                    achete: parseInt(item.qte)
                });
            }
        })
        fetch(`${baseURL}/ajout-recu`, {
            method: "POST",
            body: JSON.stringify({
                magasin: SuppAAnnuler.magasin,
                date: SuppAAnnuler.date,
                items: SuppAAnnuler.items
            }),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        })
            .then(() => setSuppAAnnuler(""))
            .then(() => 
                fetch(`${baseURL}/nouvel-achat`, {
                    method: "PUT",
                    body: JSON.stringify({
                        dejaAchete: dejaAchete
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                }))
            .then(res => res.json())
            .then(() => setF5(f5 + 1))
        // maj inventaire
    }

    return (
        <>
            <p>Bienvenue sur CalcGluten, où vous pouvez calculez le montant admissible aux déductions d'impôts liés <ExternalLink href="https://www.canada.ca/fr/agence-revenu/services/formulaires-publications/publications/rc4065/frais-medicaux.html#toc12">à la maladie cœliaque</ExternalLink>.</p>
            <AjoutRecu>
                <button>
                    <Link to="/ajout">Entrez des données</Link>
                </button>
            </AjoutRecu>
            <section>
                <h2>Derniers reçus</h2>
                <Derniers setSuppAAnnuler={setSuppAAnnuler} />
            </section>
            <section>
                <h2>Tous les reçus</h2>
                {
                    SuppAAnnuler !== "" &&
                    <Annul onClick={annulSupp}>Rétablir dernier reçu supprimé.</Annul>
                }
                <TousDerniers setSuppAAnnuler={setSuppAAnnuler} />
            </section>
        </>
    )
}

const AjoutRecu = styled.div`
    display: flex;
    justify-content: center;
    button {
        padding: 5px 10px;
        a {
            text-decoration: none;
        }
    }
    
`

const Annul = styled.button`
    padding: 5px 10px;
`

export default Accueil;