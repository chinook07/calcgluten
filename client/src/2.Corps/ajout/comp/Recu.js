import styled from "styled-components";
import { useState, useContext } from "react";

import { ContexteGlut } from "../../../ContexteGlut";
import Item from "./Item";

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
            })
            if (nouvelAchat === true) {
                pasDejaAchete.push({
                    aliment: item.item,
                    prix: 0,
                    achete: parseInt(item.qte)
                });
            }
            if (item.qte === null || item.item === null || item.prix === null) {
                setErreur(true)
            }
        })
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
                .then(() => setF5(f5 + 1))
                .then(() => setEtape(1))
                
        } else {
            setErreur(true);
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
        setTousItems(copieItems);
        setNumItems(numItems - 1)
    }

    const entreeMagasin = (e) => {
        if (e.key !== "Enter") {
            e.preventDefault();
        }
    }

    return (
        <form onSubmit={ajoutRecu}>
            <Champs>
                <legend>Nouveau reçu</legend>
                <MagEtDate>
                    <label htmlFor="magasin">Magasin</label>
                    <input
                        id="magasin"
                        onChange={majMagasin}
                        onKeyUp={entreeMagasin}
                        placeholder="Profit-go"
                        type="text"
                    />
                </MagEtDate>
                <BoutonAjout onClick={plusUn}>Ajouter item</BoutonAjout>
                {
                    numItems > 0 &&
                    <Legende aria-hidden>
                            <label htmlFor="qteItem">Quantité</label>
                            <label htmlFor="nomItem">Item</label>
                            <label htmlFor="prixItem">Prix par unité</label>
                            <span></span>
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
                <MagEtDate>
                    <label htmlFor="dateAchat">Date de l'achat</label>
                    <input
                        id="dateAchat"
                        onChange={majDate}
                        type="date"
                    />
                </MagEtDate>
                {
                    numItems > 0 &&
                    <BoutonEnv type="submit">Sauvegarder</BoutonEnv>
                }
                {
                    erreur &&
                    <div>Erreur!</div>
                }
            </Champs>
        </form>
    )
}

const Champs = styled.fieldset`
    border: 1px solid black;
    box-shadow: 1px 1px 3px var(--c2);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    div input {
        padding: 5px 10px;
    }
`

const MagEtDate = styled.div`
    align-items: center;
    display: flex;
    gap: 15px;
    justify-content: center;
`

const BoutonAjout = styled.button`
    cursor: pointer;
    margin: 0 auto;
    padding: 5px 10px;
    width: 100px;
`

const Legende = styled.div`
    display: grid;
    gap: 30px;
    grid-template-columns: 100px 200px 100px 20px;
    justify-content: center;
    margin-top: 15px;
    label {
        text-align: center;
    }
`

const BoutonEnv = styled.button`
    cursor: pointer;
    margin: 0 auto;
    padding: 5px 10px;
    width: 100px;
`

export default Recu;