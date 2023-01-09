import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Entete = () => {
    return (
        <Wrapper>
            <h1>CalcGluten</h1>
            <nav>
                <NavLink to="/">Accueil</NavLink>
                <NavLink to="/comparatif">Comparatif</NavLink>
                <NavLink to="/ajout">Ajout</NavLink>
                <NavLink to="/resume">Résumé</NavLink>
            </nav>
        </Wrapper>
    )
}

const Wrapper = styled.header`
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
        
        a {
            border: 1px solid black;
            border-radius: 10px;
            color: var(--c11);
            height: 50px;
            padding: 10px;
            text-decoration: none;
            &.active {
                background-color: var(--c10);
            }
        }
    }
`

export default Entete;