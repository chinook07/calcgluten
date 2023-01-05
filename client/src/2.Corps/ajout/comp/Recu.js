import styled from "styled-components";
import { useState } from "react";

import Item from "./Item";

const Recu = ({ setEtape }) => {

    const [numItems, setNumItems] = useState(0);
    const [magasin, setMagasin] = useState("");
    const [tousItems, setTousItems] = useState([]);
    const [dateRecu, setDateRecu] = useState("");

    const majMagasin = (e) => setMagasin(e.target.value);
    const majDate = (e) => setDateRecu(e.target.value);
    const majItems = (e) => {
        console.log(e.target.attributes[0]);
        console.log(e.target.attributes[2]);
    }

    const ajoutRecu = (e) => {
        e.preventDefault()
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
        <Wrapper onSubmit={ajoutRecu}>
            <fieldset>
                <div>
                    <label>Magasin</label>
                    <input
                        type="text"
                        onChange={majMagasin}
                        onKeyUp={entreeMagasin}
                    />
                </div>
                <BoutonAjout onClick={plusUn}>Ajouter item</BoutonAjout>
                {
                    numItems > 0 &&
                    <Legende aria-hidden>
                            <p>Quantité</p>
                            <p>Item</p>
                            <p>Prix par unité</p>
                    </Legende>
                }
                {
                    Array.from(Array(numItems).keys()).map((item, index) => {
                        return (
                            <Item
                                key={index}
                                majItems={majItems}
                                ordre={index}
                            />
                        )
                    })
                }
                {
                    numItems > 0 &&
                    <BoutonAjout onClick={plusUn}>Ajouter item</BoutonAjout>
                }
                <div>
                    <label>Date de l'achat</label>
                    <input
                        onChange={majDate}
                        type="date"
                    />
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

const Legende = styled.div`
    display: flex;
    justify-content: space-evenly;
`

const BoutonEnv = styled.button`
    margin: 0 auto;
    width: 100px;
`

export default Recu;