import styled from "styled-components";
import { useState } from "react";

import Choix from "./comp/Choix";
import Recu from "./comp/Recu";

const Ajout = () => {

    const [etape, setEtape] = useState(0);

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
                </>
            }
        </>
    )
}

export default Ajout;