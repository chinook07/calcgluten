import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faPenToSquare, faDumpster } from "@fortawesome/free-solid-svg-icons";

const TousArticles = ({ catalogue, modifierMoyenne, montrerLettres, supprimerMoyenne }) => {

    let resultatsFiltres = [];

    montrerLettres.forEach(lettre => {
        catalogue.forEach(entree => {
            if (entree.aliment.startsWith(lettre)) {
                resultatsFiltres.push(entree)
            }
        })
    });

    return (
        <Wrapper>
            {
                resultatsFiltres.map((item, index) => {
                    return (
                        <li key={index}>
                            <p>{item.aliment}</p>
                            <p>{item.achete}</p>
                            <Complet prix={item.prix}>{item.prixLocale} $</Complet>
                            <button onClick={() => modifierMoyenne(item)}>
                                <span>Modifier</span>
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </button>
                            {
                                item.achete === 0
                                    ? <button onClick={() => supprimerMoyenne(item.aliment)}>
                                        <span>Supprimer</span>
                                        <FontAwesomeIcon icon={faDumpster} />
                                    </button>
                                    : <button disabled>
                                        <span>Supprimer</span>
                                        <FontAwesomeIcon icon={faDumpster} />
                                    </button>
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
    li {
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
    }
`

const Complet = styled.p`
    color: ${props => props.prix === 0 && "red"};
    font-weight: ${props => props.prix === 0 && "bold"};
`

export default TousArticles;