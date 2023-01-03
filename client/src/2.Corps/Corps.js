import styled from "styled-components";
import { Routes, Route } from "react-router-dom";

import Accueil from "./accueil/Accueil";
import Ajout from "./ajout/Ajout";
import Resume from "./resume/Resume";

const Corps = () => {
    return (
        <Wrapper>
            <Routes>
                <Route path="/" element={< Accueil />} />
                <Route path="/ajout" element={< Ajout />} />
                <Route path="/resume" element={< Resume />} />
                <Route path="*" element={< div>Erreur</div>} />
            </Routes>
        </Wrapper>
    )
}

const Wrapper = styled.main``

export default Corps;