import styled from "styled-components";
import { useContext } from "react";
import { NavLink } from "react-router-dom";

import { ContexteGlut } from "../ContexteGlut";

const Entete = () => {

    const { connecte, setConnecte } = useContext(ContexteGlut);

    const deconnecter = () => {
        connecte ? setConnecte(false) : setConnecte(true);
    }

    return (
        <Wrapper>
            <h1>CalcGluten</h1>
            <nav>
                {
                    connecte &&
                    <>
                        <NavLink to="/">Accueil</NavLink>
                        <NavLink to="/comparatif">Comparatif</NavLink>
                        <NavLink to="/ajout">Ajout</NavLink>
                        <NavLink to="/resume">Résumé</NavLink>
                        <Deconn onClick={deconnecter}>Quitter</Deconn>
                    </>
                }
                {
                    connecte === false &&
                    <Deconn onClick={deconnecter}>Se connecter</Deconn>
                }
            </nav>
        </Wrapper>
    )
}

const Wrapper = styled.header`
    align-items: center;
    background-color: var(--c0);
    display: flex;
    height: 100px;
    justify-content: space-between;
    padding: 15px;
    h1 {
        color: var(--c11);
    }
    nav {
        display: flex;
        gap: 10px;
        a,
        button {
            border: 1px solid black;
            border-radius: 10px;
            color: var(--c11);
            height: 40px;
            padding: 10px;
            text-decoration: none;
            &.active {
                background-color: var(--c10);
            }
        }
    }
    @media screen and (max-width: 660px) {
        height: 150px;
        flex-direction: column;
    }
`

const Deconn = styled.button`
    background: none;
    font-family: "Trebuchet MS",Helvetica,sans-serif;
    font-size: medium;
    &:not(:disabled):hover {
        background: none;
    }
`

export default Entete;