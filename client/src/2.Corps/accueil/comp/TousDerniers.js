import styled from "styled-components";
import { useState, useContext } from "react";
import { getYear, parseISO } from "date-fns";

import { ContexteGlut } from "../../../ContexteGlut";
import Details from "./Details";
import Filtres from "../../comp/Filtres";

const TousDerniers = () => {

    const { tousRecus } = useContext(ContexteGlut);

    const [details, setDetails] = useState();
    const [filtrer, setFiltrer] = useState();
    
    const basculerDetails = (num) => details === num ? setDetails() : setDetails(num);

    return (
        <Wrapper>
            <Filtres
                filtrer={filtrer}
                setFiltrer={setFiltrer}
            />
            {
                tousRecus.map((item, index) => {
                    let sommeRecu = 0;
                    item.items.forEach(e => {
                        sommeRecu += e.prix * e.qte
                    })
                    let sommeVirg = ((parseFloat(sommeRecu)).toFixed(2)).replace(".", ",");
                    if ((filtrer !== undefined && getYear(parseISO(item.date)) === filtrer) || filtrer === undefined) {
                        return (
                            <FacRecente key={index}>
                                <Resume>
                                    <p>{item.date}</p>
                                    <p>{item.magasin}</p>
                                    <p>{sommeVirg} $</p>
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
    grid-template-columns: auto auto 50px 90px;
    padding: 5px;
    p {
        margin: 10px 0;
    }
    button {
        height: 25px;
    }
`

export default TousDerniers;