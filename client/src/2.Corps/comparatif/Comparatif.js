import styled from "styled-components";
import { useState, useContext } from "react";

import { ContexteGlut } from "../../ContexteGlut";

const Comparatif = () => {

    const { baseComp } = useContext(ContexteGlut);
    console.log(baseComp);
    const toutesCles = Object.keys(baseComp);
    const toutesValeurs = Object.values(baseComp);
    console.log(toutesCles, toutesValeurs);

    const modifierMoyenne = (aliment) => {
        console.log("on va modifier", aliment);
    }

    return (
        <Wrapper>
            <ul>
                {
                    toutesCles.map((item, index) => {
                        return (
                            <li key={index}>
                                <p>{item}</p>
                                <p>{toutesValeurs[index]}</p>
                                <button onClick={() => modifierMoyenne(item)}>Modifier moyenne</button>
                            </li>
                        )
                    })
                }
            </ul>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    li {
        background-color: var(--c4);
        display: flex;
        justify-content: space-between;
    }
`

export default Comparatif;