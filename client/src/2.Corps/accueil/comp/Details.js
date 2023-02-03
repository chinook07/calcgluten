import styled from "styled-components";
import { useContext } from "react";

import { ContexteGlut } from "../../../ContexteGlut";

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
            .then(res => res.json())
            .then(() => setF5(f5 + 1))
    }

    return (
        <Wrapper>
            <Supprimer onClick={() => supprimerRecu(item)}>Supprimez</Supprimer>
            {
                item.items.map((article, index) => {
                    return (
                        <Article key={index}>
                            <p>{article.qte} ×</p>
                            <p>{article.item}</p>
                            <p>{article.prix} $</p>
                        </Article>
                    )
                })
            }
        </Wrapper>
    )
}

const Wrapper = styled.div``

const Supprimer = styled.button``

const Article = styled.div`
    display: flex;
    gap: 10px;
    justify-content: space-between;
`

export default Details;