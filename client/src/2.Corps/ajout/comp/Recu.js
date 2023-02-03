import styled from "styled-components";
import { useState, useContext } from "react";

import { ContexteGlut } from "../../../ContexteGlut";
import Item from "./Item";
import { id } from "date-fns/locale";

const Recu = ({ setEtape }) => {

    const { baseComp, f5, setF5 } = useContext(ContexteGlut);

    const [numItems, setNumItems] = useState(0);
    const [magasin, setMagasin] = useState("");
    const [tousItems, setTousItems] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [montrerSugg, setMontrerSugg] = useState();
    const [dateRecu, setDateRecu] = useState("");
    const [erreur, setErreur] = useState(false);

    const majMagasin = (e) => setMagasin(e.target.value);
    const majDate = (e) => setDateRecu(e.target.value);
    const majItems = (e, rg) => {
        if (e._reactName === "onChange") {
            let rang = e.target.attributes.ordre.value;
            let propriete = e.target.attributes.propriete.value;
            let valeurEntree = e.target.value;
            if (propriete === "qte") {
                let varItems = tousItems;
                varItems[rang].qte = valeurEntree;
                setTousItems(varItems);
            }
            if (propriete === "item") {
                let liste = [];
                baseComp.forEach(element => {
                    element.aliment.includes(valeurEntree) && liste.push(element.aliment)
                });
                setSuggestions(liste)
                setMontrerSugg(rang)
                valeurEntree === "" && setSuggestions([]);
                let varItems = tousItems;
                varItems[rang].item = valeurEntree;
                setTousItems(varItems);
            }
            if (propriete === "prix") {
                let varItems = tousItems;
                varItems[rang].prix = valeurEntree;
                setTousItems(varItems);
            }
        } else {
            let varItems = tousItems;
            varItems[rg].item = e;
            setTousItems(varItems);
        }
    }

    const ajoutRecu = (e) => {
        setErreur(false);
        e.preventDefault();
        let dejaAchete = [];
        let pasDejaAchete = [];
        tousItems.forEach((item, index) => {
            let nouvelAchat = true;
            baseComp.forEach(i => {
                if (i.aliment === item.item) {
                    dejaAchete.push({ id: i._id, qtePlus: parseInt(item.qte) });
                    nouvelAchat = false;
                }
                // Vérifier si les items dans la BD ont été achetés, si oui, mettre à jour la BD.
            })
            if (nouvelAchat === true) {
                pasDejaAchete.push({
                    aliment: item.item,
                    prix: 0,
                    achete: parseInt(item.qte)
                });
            }
            if (item.qte === null || item.item === null || item.prix === null) {
                console.log("erreur avec item", index + 1);
                setErreur(true)
            }
        })
        console.log("achete", dejaAchete, "pas acheté", pasDejaAchete);
        console.log("tous items achetés", tousItems, "base de données", baseComp);
        if (magasin !== "" && dateRecu !== "" && numItems > 0 && tousItems.length) {
            fetch("/api/ajout-recu", {
                method: "POST",
                body: JSON.stringify({
                    magasin: magasin,
                    date: dateRecu,
                    items: tousItems
                }),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
            })
                .then(() => 
                    fetch("/api/nouvel-achat", {
                        method: "PUT",
                        body: JSON.stringify({
                            dejaAchete: dejaAchete
                        }),
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        },
                    }))
                .then(() => 
                    fetch("/api/nouvel-item", {
                        method: "POST",
                        body: JSON.stringify({
                            pasDejaAchete: pasDejaAchete
                        }),
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        }
                    })
                )
                .then(res => res.json())
                // )
                .then(() => setF5(f5 + 1))
                // .then(() => setEtape(2))
                
        } else {
            setErreur(true);
            console.log("magasin manquant");
        }
    }

    const plusUn = (e) => {
        e.preventDefault();
        setNumItems(numItems + 1);
        let varTousItems = tousItems;
        varTousItems[numItems] = {
            "qte": null,
            "item": null,
            "prix": null
        }
        setTousItems(varTousItems)
    }

    const moinsUn = (item) => {
        let copieItems = tousItems;
        copieItems.pop(item, 1);
        console.log(item, tousItems);
        setTousItems(copieItems);
        setNumItems(numItems - 1)
    }

    const entreeMagasin = (e) => {
        if (e.key !== "Enter") {
            e.preventDefault();
        }
    }

    return (
        <Wrapper onSubmit={ajoutRecu}>
            <fieldset>
                <div>
                    <label>Magasin</label>
                    <input
                        type="text"
                        onChange={majMagasin}
                        onKeyUp={entreeMagasin}
                    />
                </div>
                <BoutonAjout onClick={plusUn}>Ajouter item</BoutonAjout>
                {
                    numItems > 0 &&
                    <Legende aria-hidden>
                            <p>Quantité</p>
                            <p>Item</p>
                            <p>Prix par unité</p>
                    </Legende>
                }
                {
                    Array.from(Array(numItems).keys()).map((item, index) => {
                        return (
                            <Item
                                key={index}
                                majItems={majItems}
                                moinsUn={moinsUn}
                                montrerSugg={montrerSugg}
                                ordre={index}
                                suggestions={suggestions}
                                setSuggestions={setSuggestions}
                            />
                        )
                    })
                }
                {
                    numItems > 0 &&
                    <BoutonAjout onClick={plusUn}>Ajouter item</BoutonAjout>
                }
                <div>
                    <label>Date de l'achat</label>
                    <input
                        onChange={majDate}
                        type="date"
                    />
                </div>
                {
                    numItems > 0 &&
                    <BoutonEnv type="submit">Sauvegarder</BoutonEnv>
                }
                {
                    erreur &&
                    <div>Erreur!</div>
                }
            </fieldset>
        </Wrapper>
    )
}

const Wrapper = styled.form`
    fieldset {
        border: 1px solid black;
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
`

const BoutonAjout = styled.button`
    cursor: pointer;
    margin: 0 auto;
    width: 100px;
`

const Legende = styled.div`
    display: flex;
    justify-content: space-evenly;
`

const BoutonEnv = styled.button`
    cursor: pointer;
    margin: 0 auto;
    width: 100px;
`

export default Recu;