import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Entete = () => {
    return (
        <Wrapper>
            <h1>CalcGluten</h1>
            <nav>
                <NavLink to="/">Accueil</NavLink>
                <NavLink to="/ajout">Ajout</NavLink>
                <NavLink to="/resume">Résumé</NavLink>
            </nav>
        </Wrapper>
    )
}

const Wrapper = styled.header`
    display: flex;
    justify-content: space-between;
    nav {
        display: flex;
        gap: 10px;
        
        a {
            border: 1px solid black;
            padding: 10px;
        }
    }
`

export default Entete;