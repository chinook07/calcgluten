import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faPenToSquare, faDumpster, faClose } from "@fortawesome/free-solid-svg-icons";
import ModifLaMoyenne from "./ModifLaMoyenne";

const TousArticles = ({ aliment, catalogue, modifierMoyenne, modifierMoy, setModifierMoy, montrerLettres, supprimerMoyenne }) => {

    let resultatsFiltres = [];

    montrerLettres.forEach(lettre => {
        catalogue.forEach(entree => {
            if (entree.aliment.toLowerCase().startsWith(lettre)) {
                resultatsFiltres.push(entree)
            }
        })
    });

    const fermerBoite = (e) => {
        e.preventDefault();
        setModifierMoy("");
    }

    return (
        <Wrapper>
            {
                resultatsFiltres.map((item, index) => {
                    return (
                        <li key={index}>
                            <Infos>
                                <p>{item.aliment}</p>
                                <p>{item.achete}</p>
                                <Complet prix={item.prix}>{item.prixLocale} $</Complet>
                                {
                                    modifierMoy !== "" && aliment._id === item._id
                                        ? <button onClick={fermerBoite}>
                                            <span>Fermer</span>
                                            <FontAwesomeIcon icon={faClose} />
                                        </button>
                                        : <button onClick={() => modifierMoyenne(item)}>
                                            <span>Modifier</span>
                                            <FontAwesomeIcon icon={faPenToSquare} />
                                        </button>
                                }
                                {
                                    item.achete === 0
                                        ? <button onClick={() => supprimerMoyenne(item.aliment)}>
                                            <span>Supprimer</span>
                                            <FontAwesomeIcon icon={faDumpster} />
                                        </button>
                                        : <button disabled title="Impossible de supprimer un aliment que vous avez acheté.">
                                            <span>Supprimer</span>
                                            <FontAwesomeIcon icon={faDumpster} />
                                        </button>
                                }
                            </Infos>
                            
                            {
                                modifierMoy !== "" && aliment._id === item._id &&
                                <ModifLaMoyenne aliment={aliment} setModifierMoy={setModifierMoy} />
                            }
                            
                        </li>
                    )
                })
            }
        </Wrapper>
    )
}

const Wrapper = styled.ul`
    padding: 0;
    
`

const Infos = styled.div`

        align-items: center;
        display: grid;
        grid-template-columns: 30% 25px 55px 100px 110px;
        justify-content: space-between;
        padding: 5px 10px;
        &:nth-child(odd) {
            background-color: var(--c3);
        }
        &:nth-child(even) {
            background-color: var(--c4);
        }
        p {
            margin: 10px 0;
        }
        button {
            display: flex;
            justify-content: space-between;
            padding: 5px 10px;
        }
        @media screen and (max-width: 520px) {
            grid-template-columns: 30% 25px 55px 40px 40px;
            button {
                justify-content: center;
                span {
                    display: none;
                }
            }
        }
`

const Complet = styled.p`
    color: ${props => props.prix === 0 && "red"};
    font-weight: ${props => props.prix === 0 && "bold"};
`

export default TousArticles;