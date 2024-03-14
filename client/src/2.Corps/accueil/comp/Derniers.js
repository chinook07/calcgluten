import styled from "styled-components";
import { useState, useContext } from "react";
import { parseISO, formatDistanceToNow } from "date-fns";

import { ContexteGlut } from "../../../ContexteGlut";
import Details from "./Details";
import { fr } from "date-fns/locale";

const Derniers = ({ setSuppAAnnuler }) => {
    
    const { tousRecus } = useContext(ContexteGlut);

    const [details, setDetails] = useState();
    
    const basculerDetails = (num) => details === num ? setDetails() : setDetails(num);

    return (
        <>
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
                                    <p><time dateTime={item.date}>Il y a {combienDeTemps}</time></p>
                                    <p>{item.magasin}</p>
                                    <p>{sommeVirg} $</p>
                                    <button onClick={() => basculerDetails(index)}>Détails</button>
                                </Resume>
                                {
                                    details === index &&
                                    <Details item={item} setDetails={setDetails} setSuppAAnnuler={setSuppAAnnuler} />
                                }
                            </FacRecente>
                        )
                    }
                })
            }
        </>
    )
}

const FacRecente = styled.div`
    &:nth-child(odd) {
        background-color: var(--c2);
        form fieldset > p {
            color: pink;
        }
    }
    &:nth-child(even) {
        background-color: var(--c0);
        form fieldset > p {
            color: #350000;
        }
    }
`

const Resume = styled.div`
    align-items: center;
    display: grid;
    gap: 10px;
    grid-template-columns: 125px auto 65px 90px;
    padding: 5px 15px;
    p {
        margin: 10px 0;
    }
    p,
    time {
        color: var(--c11);
    }
    button {
        padding: 5px 10px;
    }
    @media screen and (max-width: 550px) {
        font-size: small;
        grid-template-columns: 80px calc(100% - 240px) 60px 70px;
        padding: 5px 5px;
        button {
            padding: 5px 5px;
        }
    }
    @media screen and (min-width: 850px) {
        padding: 5px 15%;
    }
`

export default Derniers;