import styled from "styled-components";
import { useState, useContext, useEffect } from "react";

import { ContexteGlut } from "../../ContexteGlut";
import { getYear, parseISO } from 'date-fns'

const Filtres = ({ filtrer, setFiltrer, setTrimestreChoisi }) => {
    
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
        setTrimestreChoisi(undefined);
    }

    return (
        <Wrapper>
            {
                toutesAnnees.map((item, index) => {
                    return (
                        <ChoixAnnee
                            annee={item}
                            filtrer={filtrer}
                            key={index}
                            onClick={() => changerFiltre(item)}
                        >{item}</ChoixAnnee>
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
`

const ChoixAnnee = styled.li`
    background-color: var(${props => props.filtrer === props.annee ? "--c2" : "--c4"});
    color: var(${props => props.filtrer === props.annee ? "--c11" : "--c10"});
    cursor: pointer;
    padding: 10px;
`

export default Filtres;