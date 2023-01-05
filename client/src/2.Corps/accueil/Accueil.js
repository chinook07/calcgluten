import styled from "styled-components";
import { ExternalLink } from "react-external-link";
import { Link } from "react-router-dom";

const Accueil = () => {
    return (
        <>
            <p>Bienvenue sur CalcGluten, où vous pouvez calculez le montant admissible aux déductions d'impôts liés <ExternalLink href="https://www.canada.ca/fr/agence-revenu/services/formulaires-publications/publications/rc4065/frais-medicaux.html#toc12">à la maladie cœliaque</ExternalLink>.</p>
            <Link to="/ajout">Entrez des données</Link>
            <p>Montant total à déclarer pour l'année en cours :</p>
        </>
    )
}

export default Accueil;