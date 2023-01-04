import styled from "styled-components";
import { useState } from "react";

import Item from "./Item";

const Recu = ({ setEtape }) => {

    const [numItems, setNumItems] = useState(0);

    const rienFaire = (e) => {
        e.preventDefault()
        setEtape(2);
    }

    const plusUn = (e) => {
        e.preventDefault();
        setNumItems(numItems + 1);
    }

    const entreeMagasin = (e) => {
        if (e.key !== "Enter") {
            e.preventDefault();
        }
    }

    return (
        <Wrapper onSubmit={rienFaire}>
            <fieldset>
                <div>
                    <label>Magasin</label>
                    <input type="text" onKeyUp={entreeMagasin} />
                </div>
                <BoutonAjout onClick={plusUn}>Ajouter item</BoutonAjout>
                {
                    Array.from(Array(numItems).keys()).map((item, index) => {
                        return <Item key={index} />
                    })
                }
                {
                    numItems > 0 &&
                    <BoutonAjout onClick={plusUn}>Ajouter item</BoutonAjout>
                }
                <div>
                    <label>Date de l'achat</label>
                    <input type="date" />
                </div>
                {
                    numItems > 0 &&
                    <BoutonEnv type="submit">Sauvegarder</BoutonEnv>
                }
            </fieldset>
        </Wrapper>
    )
}

const Wrapper = styled.form`
    fieldset {
        border: 1px solid black;
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
`

const BoutonAjout = styled.button`
    margin: 0 auto;
    width: 100px;
`

const BoutonEnv = styled.button`
    margin: 0 auto;
    width: 100px;
`

export default Recu;