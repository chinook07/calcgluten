import styled from "styled-components";
import { useState } from "react";

import Recu from "./comp/Recu";

const Ajout = () => {

    const [etape, setEtape] = useState(0);

    const nouveauRecu = () => setEtape(0);

    return (
        <>
            <h2>Entrée de données</h2>
            {
                etape === 0 &&
                <>
                    <p>Nouveau reçu</p>
                    <Recu setEtape={setEtape} />
                </>
            }
            {
                etape === 1 &&
                <>
                    <p>Votre reçu a été ajouté.</p>
                    <Nouveau onClick={nouveauRecu}>Nouveau reçu</Nouveau>
                </>
            }
        </>
    )
}

const Nouveau = styled.button`
    padding: 10px;
`

export default Ajout;