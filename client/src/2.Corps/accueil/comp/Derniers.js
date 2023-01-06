import styled from "styled-components";
import { useContext } from "react";
import { format, parseISO, formatDistanceToNow, formatDistance } from "date-fns";

import { ContexteGlut } from "../../../ContexteGlut";
import { fr } from "date-fns/locale";

const Derniers = () => {

    const { prete, tousRecus } = useContext(ContexteGlut);

    console.log(tousRecus);
    

    return (
        <Wrapper>
            {
                tousRecus.map((item, index) => {
                    let dateAAfficher = format(parseISO(item.date), "PPPP", { locale: fr })
                    // let aujourdHui = format((new Date()), "PPPP", {locale: fr});
                    console.log(dateAAfficher);
                    let combienDeTemps = formatDistanceToNow(parseISO(item.date), {locale: fr})
                    console.log(combienDeTemps);
                    return (
                        <FacRecente key={index}>
                            <p>Il y a {combienDeTemps}</p>
                            <p>{item.magasin}</p>
                            <button>Modifier</button>
                        </FacRecente>
                    )
                })
            }
        </Wrapper>
    )
}

const Wrapper = styled.div``

const FacRecente = styled.div`
    
    display: flex;
    gap: 10px;
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

export default Derniers;