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
                fetch("/api/reduire-inventaire-max", {
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
        fetch(`/api/enlever-item-achete`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                recuAModifier: item._id,
                aEnlever: article
            })
        })
            .then(() => 
                fetch("/api/reduire-inventaire", {
                    method: "PUT",
                    body: JSON.stringify({
                        qte: parseInt(article.qte),
                        item: article.item
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
        }))
            .then(res => res.json())
            .then(() => setF5(f5 + 1))
    }

    const ajouterItem = () => {
        ajoutItem ? setAjoutItem(false) : setAjoutItem(true);
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
                            <BoutonEnl onClick={() => enleverItem(article)}>
                                <span>Enlever</span>
                                <FontAwesomeIcon icon={faBan} />
                            </BoutonEnl>
                        </Article>
                    )
                })
            }
            {
                ajoutItem &&
                <NouvelItem
                    recu={item}
                    setAjoutItem={setAjoutItem}
                />
            }
            <BoutonAction onClick={ajouterItem}>
                <span>Ajouter</span>
                <FontAwesomeIcon icon={faPizzaSlice}/>
            </BoutonAction>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    padding: 10px 0;
`

const BoutonAction = styled.button`
    display: flex;
    gap: 10px;
    margin: 0 auto;
    padding: 5px 10px;
`

const Article = styled.div`
    align-items: center;
    display: grid;
    gap: 10px;
    grid-template-columns: 30px 300px 60px 90px;
    justify-content: center;
    padding: 10px;
    p {
        margin: 0;
    }
    @media screen and (max-width: 550px) {
        font-size: small;
        grid-template-columns: 25px calc(100% - 150px) 55px 40px;
    }
`

const BoutonEnl = styled.button`
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
    @media screen and (max-width: 550px) {
        justify-content: center;
        span {
            display: none;
        }
    }
`

export default Details;