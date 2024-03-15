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
                <Recu setEtape={setEtape} />
            }
            {
                etape === 1 &&
                <>
                    <p>Vos achats ont été ajoutés. N'oubliez pas de conserver une copie de votre reçu.</p>
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