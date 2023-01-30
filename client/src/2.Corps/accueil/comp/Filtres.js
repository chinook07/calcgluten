import styled from "styled-components";
import { useState, useContext, useEffect } from "react";

import { ContexteGlut } from "../../../ContexteGlut";
import { getYear, parseISO } from 'date-fns'

const Filtres = ({ filtrer, setFiltrer }) => {
    
    const { tousRecus } = useContext(ContexteGlut);

    const [toutesAnnees, setToutesAnnees] = useState([]);

    useEffect(() => {
        let tableauAnnees = [];
        let anneeUn = getYear(parseISO(tousRecus[tousRecus.length - 1].date));
        let anneeFin = getYear(parseISO(tousRecus[0].date));
        for (let i = anneeUn; i <= anneeFin; i++) {
            tableauAnnees.push(i)
        }
        setToutesAnnees(tableauAnnees);
    }, [])

    const changerFiltre = (annee) => {
        filtrer === annee ? setFiltrer(undefined) : setFiltrer(annee);
    }

    return (
        <Wrapper>
            {
                toutesAnnees.map((item, index) => {
                    return (
                        <li key={index} onClick={() => changerFiltre(item)}>{item}</li>
                    )
                })
            }
        </Wrapper>
    )
}

const Wrapper = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    list-style-type: none;
    li {
        background-color: var(--c4);
        cursor: pointer;
        padding: 10px;
    }
`

export default Filtres;