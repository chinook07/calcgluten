import styled from "styled-components";
import { useState, useContext } from "react";

import { ContexteGlut } from "../../../ContexteGlut";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NouvelItem from "./NouvelItem";
import { faDumpster, faBan, faPizzaSlice } from "@fortawesome/free-solid-svg-icons";

const Details = ({ item }) => {

    const { f5, setF5 } = useContext(ContexteGlut);
    const [ajoutItem, setAjoutItem] = useState(false);

    const supprimerRecu = () => {
        fetch(`/api/supprimer-recu`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ aDetruire: item })
        })
            .then(() => 
                fetch("/api/reduire-inventaire", {
                    method: "PUT",
                    body: JSON.stringify({
                        aEnlever: item.items
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
        }))
            .then(res => res.json())
            .then(() => setF5(f5 + 1))
    }

    const enleverItem = (article) => {
        console.log("enlever", item, article);
        // fetch(`/api/enlever-item-achete`, {
        //     method: "PUT",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Accept": "application/json"
        //     },
        //     body: JSON.stringify({
        //         recuAModifier: item._id,
        //         aEnlever: article
        //     })
        // })
        //     .then(() => 
        //         fetch("/api/reduire-inventaire", {
        //             method: "PUT",
        //             body: JSON.stringify({
        //                 aEnlever: item.items
        //             }),
        //             headers: {
        //                 "Content-Type": "application/json",
        //                 "Accept": "application/json"
        //             },
        // }))
        //     .then(res => res.json())
        //     .then(() => setF5(f5 + 1))
    }

    const ajouterItem = () => {
        console.log("ajout");
        !ajoutItem && setAjoutItem(true);
    }

    return (
        <Wrapper>
            <BoutonAction onClick={() => supprimerRecu(item)}>
                <span>Supprimer</span>
                <FontAwesomeIcon icon={faDumpster}/>
            </BoutonAction>
            {
                item.items.map((article, index) => {
                    let prixVirg = ((parseFloat(article.prix)).toFixed(2)).replace(".", ",");
                    return (
                        <Article key={index}>
                            <p>{article.qte} ×</p>
                            <p>{article.item}</p>
                            <p>{prixVirg} $</p>
                            <button onClick={() => enleverItem(article)}>
                                <span>Enlever</span>
                                <FontAwesomeIcon icon={faBan} />
                            </button>
                        </Article>
                    )
                })
            }
            {
                ajoutItem &&
                <NouvelItem recu={item} />
            }
            <BoutonAction onClick={ajouterItem}>
                <span>Ajouter</span>
                <FontAwesomeIcon icon={faPizzaSlice}/>
            </BoutonAction>
        </Wrapper>
    )
}

const Wrapper = styled.div``

const BoutonAction = styled.button`
    display: flex;
    gap: 10px;
    margin: 0 auto;
    padding: 5px 10px;
`

const Article = styled.div`
    display: flex;
    gap: 10px;
    justify-content: space-between;
    padding: 10px;
`

export default Details;