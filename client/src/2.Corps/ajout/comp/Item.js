import styled from "styled-components";
import { useState } from "react";

const Item = ({ majItems, montrerSugg, ordre, suggestions }) => {

    const [choix, setChoix] = useState("");

    // const ajouterDollar = (e) => {
    //     console.log(e.target.value);
    //     e.target.value = `${e.target.value} $`
    // }
    const choisirLui = (choixDuChef) => {
        console.log("choix", choixDuChef);
        setChoix(choixDuChef);
    }
    return (
        <Wrapper>
            <fieldset>
                <input
                    id="nomItem"
                    onChange={majItems}
                    ordre={ordre}
                    propriete="item"
                    type="text"
                />
                <ItemChoisi>
                    {
                        choix !== "" &&
                        <span>{choix}</span>
                    }
                </ItemChoisi>
                <input
                    id="qteItem"
                    onChange={majItems}
                    ordre={ordre}
                    propriete="qte"
                    type="number"
                />
                <input
                    id="prixItem"
                    onChange={majItems}
                    ordre={ordre}
                    propriete="prix"
                    step="0.01"
                    type="number"
                />
                <span> $</span>
            </fieldset>
            <Suggestions>
                {
                    montrerSugg === ordre.toString() &&
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
        </Wrapper>
    )
}

const Wrapper = styled.div`
    fieldset {
        display: grid;
        grid-template-columns: 200px max-content 100px auto 20px;
        input {
            border-radius: 5px;
            padding: 5px;
        }
    }
`


const ItemChoisi = styled.p`

`

const Suggestions = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    list-style-type: none;
    padding-left: 0;
    li {
        background-color: var(--c4);
        border-radius: 10px;
        cursor: pointer;
        padding: 10px;
        &:hover {
            background-color: var(--c5);
        }
    }
`

export default Item;