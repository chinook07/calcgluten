import styled from "styled-components";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faPencil, faClose } from "@fortawesome/free-solid-svg-icons";

const Item = ({ majItems, montrerSugg, ordre, suggestions, setSuggestions, moinsUn }) => {

    const [choix, setChoix] = useState("");

    const choisirLui = (choixDuChef) => {
        setSuggestions([])
        setChoix(choixDuChef);
        majItems(choixDuChef, ordre);
    }

    const modifierItem = () => setChoix("");

    return (
        <Wrapper>
            <input
                id="qteItem"
                onChange={majItems}
                ordre={ordre}
                propriete="qte"
                type="number"
            />
            
            <p>×</p>
            <BoiteSugg>
                <input
                    id="nomItem"
                    onChange={majItems}
                    ordre={ordre}
                    propriete="item"
                    type="text"
                />
                {
                    montrerSugg === ordre.toString() && suggestions !== [] &&
                    <Suggestions>
                            {
                                suggestions.map((item, index) => {
                                    return (
                                        <li
                                            key={index}
                                            onClick={() => choisirLui(item)}
                                        >{item}</li>
                                    )
                                })
                            }
                    </Suggestions>
                }
                {
                    choix !== "" &&
                    <ItemChoisi>
                            <p>{choix}</p>
                            <FontAwesomeIcon icon={faPencil} onClick={modifierItem} />
                    </ItemChoisi>
                }
                
            </BoiteSugg>
            <p>à</p>
            <input
                id="prixItem"
                onChange={majItems}
                ordre={ordre}
                propriete="prix"
                step="0.01"
                type="number"
            />
            <p> $</p>
            <FontAwesomeIcon
                icon={faClose}
                onClick={() => moinsUn(ordre)}
                title="supprimer item"
            />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    align-items: center;
    display: flex;
    gap: 10px;
    input {
        border-bottom: 2px solid var(--c2);
        border-left: 2px solid var(--c4);
        border-radius: 5px;
        border-right: 2px solid var(--c4);
        border-top: 2px solid var(--c4);
        padding: 5px;
        &[type=number] {
            width: 100px;
        }
    }
    > svg {
        cursor: pointer;
    }
`

const BoiteSugg = styled.div`
    position: relative;
`

const ItemChoisi = styled.div`
    background-color: aqua;
    display: flex;
    justify-content: space-between;
    margin: 0;
    padding: 10px;
    position: absolute;
    top: 0;
    width: 100%;
    p {
        margin: 0;
    }
    svg {
        cursor: pointer;
    }
`

const Suggestions = styled.ul`
    background-color: var(--c2);
    border-radius: 0 0 5px 5px;
    list-style-type: none;
    margin: 0;
    padding-left: 0;
    position: absolute;
    width: 100%;
    z-index: 1;
    li {
        color: var(--c1);
        cursor: pointer;
        padding: 10px;
        &:hover {
            background-color: var(--c5);
            color: var(--c2);
        }
    }
`

export default Item;