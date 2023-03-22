import styled from "styled-components";
import { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import Accueil from "./accueil/Accueil";
import Comparatif from "./comparatif/Comparatif";
import Ajout from "./ajout/Ajout";
import Resume from "./resume/Resume";
import Auth from "./Auth";
import { ContexteGlut } from "../ContexteGlut";

const Corps = () => {

    const { prete, connecte } = useContext(ContexteGlut);
    
    return (
        <Wrapper>
            {
                prete && connecte &&
                    <Routes>
                        <Route path="/" element={< Accueil />} />
                        <Route path="/comparatif" element={< Comparatif />} />
                        <Route path="/ajout" element={< Ajout />} />
                        <Route path="/resume" element={< Resume />} />
                        <Route path="*" element={< div>Erreur</div>} />
                </Routes>
            }
            {
                connecte === false &&
                <Auth />
            }
        </Wrapper>
    )
}

const Wrapper = styled.main`
    min-height: calc(100vh - 200px);
    padding: 10px;
    @media screen and (max-width: 580px) {
        min-height: calc(100vh - 250px);
    }
`

export default Corps;