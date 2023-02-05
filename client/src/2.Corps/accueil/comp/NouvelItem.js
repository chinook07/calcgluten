import styled from "styled-components";
import { useState } from "react";

const NouvelItem = () => {

    const [entreeQte, setEntreeQte] = useState(0);
    const [entreeItem, setEntreeItem] = useState(0);
    const [entreePrix, setEntreePrix] = useState(0);

    const majItems = (e) => {
        e.target.id === "qteItem" && setEntreeQte(e.target.value);
        e.target.id === "nomItem" && setEntreeItem(e.target.value);
        e.target.id === "prixItem" && setEntreePrix(e.target.value);
    }

    const envoyerAjout = (e) => {
        e.preventDefault();
        console.log("envoyez");
    }

    return (
        <Wrapper onSubmit={envoyerAjout}>
            <p>{entreeQte}, {entreeItem}, {entreePrix}</p>
            <fieldset>
                <input
                    id="qteItem"
                    onChange={majItems}
                    type="number"
                />
                
                <input
                    id="nomItem"
                    onChange={majItems}
                    type="texte"
                />
                <input
                    id="prixItem"
                    min="0"
                    onChange={majItems}
                    step="0.01"
                    type="number"
                />
                <button type="submit">Ajouter</button>
            </fieldset>
        </Wrapper>
    )
}

const Wrapper = styled.form``

export default NouvelItem;