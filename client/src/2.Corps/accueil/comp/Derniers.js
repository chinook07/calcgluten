import styled from "styled-components";
import { useState, useContext } from "react";
import { parseISO, formatDistanceToNow } from "date-fns";

import { ContexteGlut } from "../../../ContexteGlut";
import { fr } from "date-fns/locale";

const Derniers = () => {

    const { tousRecus } = useContext(ContexteGlut);

    const [details, setDetails] = useState();

    console.log(tousRecus);
    
    const basculerDetails = (num) => details === num ? setDetails() : setDetails(num);

    return (
        <Wrapper>
            {
                tousRecus.map((item, index) => {
                    let combienDeTemps = formatDistanceToNow(parseISO(item.date), {locale: fr})
                    let sommeRecu = 0;
                    item.items.forEach(e => {
                        sommeRecu += e.prix * e.qte
                    })
                    return (
                        <FacRecente key={index}>
                            <Resume>
                                <p>Il y a {combienDeTemps}</p>
                                <p>{item.magasin}</p>
                                <p>{sommeRecu}</p>
                                <button>Modifier</button>
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
    display: flex;
    gap: 10px;
`

const Details = styled.div``

const Article = styled.div`
    display: flex;
    gap: 10px;
    justify-content: space-between;
`

export default Derniers;