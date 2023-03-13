import styled from "styled-components";

const SelectLettres = ({ changerLettres }) => {
    
    return (
        <Wrapper>
            <button
                className="actif"
                id="lettres1"
                onClick={() => changerLettres(["a", "b", "c", "d", "e", "f"], "lettres1")}
            >A–F</button>
            <button
                id="lettres2"
                onClick={() => changerLettres(["g", "h", "i", "j", "k", "l"], "lettres2")}
            >G–L</button>
            <button
                id="lettres3"
                onClick={() => changerLettres(["m", "n", "o", "p", "q", "r"], "lettres3")}
            >M–R</button>
            <button
                id="lettres4"
                onClick={() => changerLettres(["s", "t", "u", "v", "w", "x", "y", "z"], "lettres4")}
            >S–Z</button>
        </Wrapper>
    )
}

const Wrapper = styled.nav`
    display: flex;
    gap: 15px;
    justify-content: center;
    button {
        padding: 5px 10px;
        &.actif {
            background-color: var(--c4);
        }
    }
`

export default SelectLettres;