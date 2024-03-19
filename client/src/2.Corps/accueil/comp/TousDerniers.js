import styled from "styled-components";
import { useState, useContext } from "react";
import { getYear, getQuarter, parseISO } from "date-fns";

import { ContexteGlut } from "../../../ContexteGlut";
import Details from "./Details";
import Filtres from "../../comp/Filtres";
import FiltresMois from "./FiltresMois";

const TousDerniers = ({ setSuppAAnnuler }) => {

    const { tousRecus } = useContext(ContexteGlut);

    const [details, setDetails] = useState();
    const [filtrer, setFiltrer] = useState();
    const [trimestreChoisi, setTrimestreChoisi] = useState();

    const lesTrimestres = [
        {"trimestre": 1, "mois": "JAN–MAR"},
        {"trimestre": 2, "mois": "AVR–JUN"},
        {"trimestre": 3, "mois": "JUL–SEP"},
        {"trimestre": 4, "mois": "OCT–DÉC"}
    ]
    
    const basculerDetails = (num) => details === num ? setDetails() : setDetails(num);

    return (
        <>
            <Filtres
                filtrer={filtrer}
                setFiltrer={setFiltrer}
                setTrimestreChoisi={setTrimestreChoisi}
            />
            {
                filtrer !== undefined &&
                <FiltresMois
                    lesTrimestres={lesTrimestres}
                    trimestreChoisi={trimestreChoisi}
                    setTrimestreChoisi={setTrimestreChoisi}
                />
            }
            {
                tousRecus.map((item, index) => {
                    let sommeRecu = 0;
                    item.items.forEach(e => {
                        sommeRecu += e.prix * e.qte
                    })
                    let sommeVirg = ((parseFloat(sommeRecu)).toFixed(2)).replace(".", ",");
                    if (((getYear(parseISO(item.date)) === filtrer) || filtrer === undefined) && ((getQuarter(parseISO(item.date)) === trimestreChoisi) || trimestreChoisi === undefined)) {
                        return (
                            <FacRecente key={index}>
                                <Resume>
                                    <p><time dateTime={item.date}>{item.date}</time></p>
                                    <p>{item.magasin}</p>
                                    <p>{sommeVirg} $</p>
                                    <button onClick={() => basculerDetails(index)}>Détails</button>
                                </Resume>
                                {
                                    details === index &&
                                    <Details item={item} setSuppAAnnuler={setSuppAAnnuler} />
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
    &:nth-child(even) {
        background-color: var(--c2);
        form fieldset > p {
            color: pink;
        }
    }
    &:nth-child(odd) {
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

export default TousDerniers;