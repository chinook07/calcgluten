import styled from "styled-components";
import { useState, useContext } from "react";

import { ContexteGlut } from "../../../ContexteGlut";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NouvelItem from "./NouvelItem";
import { faDumpster, faBan, faPizzaSlice } from "@fortawesome/free-solid-svg-icons";

const Details = ({ item, setDetails, setSuppAAnnuler }) => {

    const { f5, setF5 } = useContext(ContexteGlut);
    const [ajoutItem, setAjoutItem] = useState(false);
    const [voulezVousSupprimer, setVoulezVousSupprimer] = useState();
    const [voulezVousEnlever, setVoulezVousEnlever] = useState();
    const [indexEnlever, setIndexEnlever] = useState();
    
    const baseURL = process.env.NODE_ENV === 'production' ? 'https://calcgluten.onrender.com/api' : 'http://localhost:8000/api';

    const validerSupp = (recu) => setVoulezVousSupprimer(recu);

    const pasSupprimer = () => setVoulezVousSupprimer();

    const supprimerRecu = () => {
        setSuppAAnnuler(voulezVousSupprimer);
        fetch(`${baseURL}/supprimer-recu`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ aDetruire: item })
        })
            .then(() => 
                fetch(`${baseURL}/reduire-inventaire-max`, {
                    method: "PUT",
                    body: JSON.stringify({
                        aEnlever: item.items
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
        }))
            .then(res => res.json())
            .then(() => {
                setF5(f5 + 1)
                setVoulezVousSupprimer();
                setDetails();
            })
    }
    
    const validerEnlever = (item, index) => {
        setVoulezVousEnlever(item);
        setIndexEnlever(index);
    }
    
    const pasEnlever = () => {
        setVoulezVousEnlever();
        setIndexEnlever();
    }

    const enleverItem = () => {
        fetch(`${baseURL}/enlever-item-achete`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                recuAModifier: item._id,
                aEnlever: voulezVousEnlever
            })
        })
            .then(() => 
                fetch(`${baseURL}/reduire-inventaire`, {
                    method: "PUT",
                    body: JSON.stringify({
                        qte: parseInt(voulezVousEnlever.qte),
                        item: voulezVousEnlever.item
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
        }))
            .then(res => res.json())
            .then(() => {
                setF5(f5 + 1)
                setVoulezVousEnlever();
                setIndexEnlever();
            })
    }

    const ajouterItem = () => {
        pasSupprimer();
        ajoutItem ? setAjoutItem(false) : setAjoutItem(true);
    }

    return (
        <Wrapper>
            {
                voulezVousSupprimer === undefined &&
                <BoutonAction onClick={() => validerSupp(item)}>
                        <span>Supprimer</span>
                        <FontAwesomeIcon icon={faDumpster}/>
                </BoutonAction>
            }
            {
                voulezVousSupprimer !== undefined &&
                <Certain>
                        <p>Attention! Êtes-vous certain(e) de vouloir supprimer cette facture?</p>
                        <div>
                            <button onClick={supprimerRecu}>Oui, supprimer</button>
                            <button onClick={pasSupprimer}>Non, conserver</button>
                        </div>
                </Certain>
            }
            {
                item.items.map((article, index) => {
                    let prixVirg = ((parseFloat(article.prix)).toFixed(2)).replace(".", ",");
                    return (
                        <Article key={index}>
                            <p>{article.qte} ×</p>
                            <p>{article.item}</p>
                            {
                                (voulezVousEnlever === undefined || indexEnlever !== index) &&
                                <>
                                    <p>{prixVirg} $</p>
                                    <BoutonEnl onClick={() => validerEnlever(article, index)}>
                                        <span>Enlever</span>
                                        <FontAwesomeIcon icon={faBan} />
                                    </BoutonEnl>
                                </>
                                
                            }
                            {
                                indexEnlever === index &&
                                <OuiNonEnl>
                                        <p>Enlever item?</p>
                                        <button onClick={enleverItem}>Oui</button>
                                        <button onClick={pasEnlever}>Non</button>
                                </OuiNonEnl>
                            }
                        </Article>
                    )
                })
            }
            {
                ajoutItem &&
                <NouvelItem
                    recu={item}
                    setAjoutItem={setAjoutItem}
                />
            }
            <BoutonAction onClick={ajouterItem}>
                {
                    ajoutItem ? <span>Fermer</span> : <span>Ajouter</span>
                }
                <FontAwesomeIcon icon={faPizzaSlice}/>
            </BoutonAction>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    padding: 10px 0;
`

const BoutonAction = styled.button`
    display: flex;
    gap: 10px;
    margin: 0 auto;
    padding: 5px 10px;
`

const Certain = styled.div`
    p {
        color: white;
        text-align: center;
    }
    div {
        display: flex;
        gap: 5px;
        justify-content: center;
        button {
            padding: 5px 10px;
        }
    }
`

const OuiNonEnl = styled.div`
    display: flex;
    gap: 5px;
    button {
        padding: 5px 10px;
    }
`

const Article = styled.div`
    align-items: center;
    display: grid;
    gap: 10px;
    grid-template-columns: 30px 300px 60px 90px;
    justify-content: center;
    padding: 10px;
    p {
        color: var(--c11);
        margin: 0;
    }
    @media screen and (max-width: 550px) {
        font-size: small;
        grid-template-columns: 25px calc(100% - 150px) 55px 40px;
    }
`

const BoutonEnl = styled.button`
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
    @media screen and (max-width: 550px) {
        justify-content: center;
        span {
            display: none;
        }
    }
`

export default Details;