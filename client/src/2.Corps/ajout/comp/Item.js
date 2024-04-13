import styled from "styled-components";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";

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
                placeholder="2"
                propriete="qte"
                required
                type="number"
            />
            <p>×</p>
            <BoiteSugg>
                <input
                    autoComplete="off"
                    id="nomItem"
                    onChange={majItems}
                    ordre={ordre}
                    placeholder="aliment"
                    propriete="item"
                    type="text"
                />
                {
                    montrerSugg === ordre.toString() &&
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
                min="0"
                onChange={majItems}
                ordre={ordre}
                placeholder="12,34"
                propriete="prix"
                required
                step="0.01"
                type="number"
            />
            <p> $</p>
            <FontAwesomeIcon
                icon={faTrashCan}
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
    justify-content: center;
    input {
        border-bottom: 2px solid var(--c2);
        border-left: 2px solid var(--c4);
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
    @media screen and (max-width: 550px) {
        flex-direction: column;
        gap: 0;
        p {
            margin: 5px 0;
        }
    }
`

const BoiteSugg = styled.div`
    position: relative;
    width: 200px;
    input {
        width: 100%;
    }
`

const ItemChoisi = styled.div`
    background-color: var(--c1);
    border-bottom: 2px solid var(--c2);
    border-left: 2px solid var(--c4);
    border-radius: 10px;
    border-right: 2px solid var(--c4);
    border-top: 2px solid var(--c4);
    display: flex;
    justify-content: space-between;
    margin: 0;
    padding: 5px 10px;
    position: absolute;
    top: 0;
    width: 100%;
    p {
        font-size: small;
        margin: 0;
    }
    svg {
        cursor: pointer;
    }
`

const Suggestions = styled.ul`
    background-color: var(--c2);
    border-radius: 0 0 5px 5px;
    bottom: 0;
    max-height: 200px;
    list-style-type: none;
    margin: 0;
    overflow-y: scroll;
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