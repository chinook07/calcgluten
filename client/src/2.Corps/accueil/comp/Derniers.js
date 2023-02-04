import styled from "styled-components";
import { useState, useContext } from "react";
import { parseISO, formatDistanceToNow } from "date-fns";

import { ContexteGlut } from "../../../ContexteGlut";
import Details from "./Details";
import { fr } from "date-fns/locale";

const Derniers = () => {

    const { tousRecus } = useContext(ContexteGlut);

    const [details, setDetails] = useState();
    
    const modifierRecu = (recu) => {
        console.log("modifier", recu);
    }
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
                    let sommeVirg = ((parseFloat(sommeRecu)).toFixed(2)).replace(".", ",");
                    if (index < 5) {
                        return (
                            <FacRecente key={index}>
                                <Resume>
                                    <p>Il y a {combienDeTemps}</p>
                                    <p>{item.magasin}</p>
                                    <p>{sommeVirg} $</p>
                                    <button onClick={() => modifierRecu(index)}>Modifier</button>
                                    <button onClick={() => basculerDetails(index)}>Détails</button>
                                </Resume>
                                {
                                    details === index &&
                                    <Details item={item} />
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

export default Derniers;