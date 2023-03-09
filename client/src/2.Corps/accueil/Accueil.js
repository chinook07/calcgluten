import styled from "styled-components";
import { ExternalLink } from "react-external-link";
import { Link } from "react-router-dom";

import Derniers from "./comp/Derniers";
import TousDerniers from "./comp/TousDerniers";

const Accueil = () => {
    return (
        <>
            <p>Bienvenue sur CalcGluten, où vous pouvez calculez le montant admissible aux déductions d'impôts liés <ExternalLink href="https://www.canada.ca/fr/agence-revenu/services/formulaires-publications/publications/rc4065/frais-medicaux.html#toc12">à la maladie cœliaque</ExternalLink>.</p>
            <AjoutRecu>
                <Link to="/ajout">Entrez des données</Link>
            </AjoutRecu>
            <p>Montant total à déclarer pour l'année en cours :</p>
            <section>
                <h2>Derniers reçus</h2>
                <Derniers />
            </section>
            <section>
                <h2>Tous les reçus</h2>
                <TousDerniers />
            </section>
        </>
    )
}

const AjoutRecu = styled.div`
    display: flex;
    justify-content: center;
    a {
        text-decoration: none;
        &:hover {
            color: var(--c2);
        }
    }
`

export default Accueil;