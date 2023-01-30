import styled from "styled-components";
import { useState, useContext } from "react";
import { getYear, parseISO, formatDistanceToNow } from "date-fns";

import { ContexteGlut } from "../../../ContexteGlut";
import Filtres from "./Filtres";
import { fr } from "date-fns/locale";

const TousDerniers = () => {

    const { tousRecus } = useContext(ContexteGlut);

    const [details, setDetails] = useState();
    const [filtrer, setFiltrer] = useState();
    
    const modifierRecu = (recu) => {
        console.log("modifier", recu);
    }
    const basculerDetails = (num) => details === num ? setDetails() : setDetails(num);

    console.log(tousRecus);

    return (
        <Wrapper>
            <Filtres
                filtrer={filtrer}
                setFiltrer={setFiltrer}
            />
            {
                tousRecus.map((item, index) => {
                    let combienDeTemps = formatDistanceToNow(parseISO(item.date), {locale: fr})
                    let sommeRecu = 0;
                    item.items.forEach(e => {
                        sommeRecu += e.prix * e.qte
                    })
                    if ((filtrer !== undefined && getYear(parseISO(item.date)) === filtrer) || filtrer === undefined) {
                        return (
                            <FacRecente key={index}>
                                <Resume>
                                    <p>Il y a {combienDeTemps}</p>
                                    <p>{item.magasin}</p>
                                    <p>{sommeRecu} $</p>
                                    <button onClick={() => modifierRecu(index)}>Modifier</button>
                                    <button onClick={() => basculerDetails(index)}>Détails</button>
                                </Resume>
                                {
                                    details === index &&
                                        <Details>
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
                                    </Details>
                                }
                            </FacRecente>
                        )
                    }
                })
            }
        </Wrapper>
    )
}

const Wrapper = styled.div``

const FacRecente = styled.div`
    p {
        color: var(--c11);
    }
    &:nth-child(odd) {
        background-color: var(--c2);
    }
    &:nth-child(even) {
        background-color: var(--c3);
    }
`

const Resume = styled.div`
    align-items: center;
    display: grid;
    gap: 10px;
    grid-template-columns: auto auto 50px 90px 90px;
    padding: 5px;
    p {
        margin: 10px 0;
    }
    button {
        height: 25px;
    }
`

const Details = styled.div``

const Article = styled.div`
    display: flex;
    gap: 10px;
    justify-content: space-between;
`

export default TousDerniers;