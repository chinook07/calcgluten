import styled from "styled-components";
import { useContext } from "react";

import { ContexteGlut } from "../../../ContexteGlut";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faDumpster } from "@fortawesome/free-solid-svg-icons";

const Details = ({ item }) => {

    const { f5, setF5 } = useContext(ContexteGlut);

    const supprimerRecu = () => {
        console.log("supprimez", item);
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

    return (
        <Wrapper>
            <Supprimer onClick={() => supprimerRecu(item)}>
                <span>Supprimer</span>
                <FontAwesomeIcon icon={faDumpster}/>
            </Supprimer>
            {
                item.items.map((article, index) => {
                    let prixVirg = ((parseFloat(article.prix)).toFixed(2)).replace(".", ",");
                    return (
                        <Article key={index}>
                            <p>{article.qte} ×</p>
                            <p>{article.item}</p>
                            <p>{prixVirg} $</p>
                        </Article>
                    )
                })
            }
        </Wrapper>
    )
}

const Wrapper = styled.div``

const Supprimer = styled.button`
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