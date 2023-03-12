import styled from "styled-components";

const SelectLettres = ({ changerLettres }) => {
    
    return (
        <Wrapper>
            <button onClick={() => changerLettres(["a", "b", "c", "d", "e", "f"])}>A–F</button>
            <button onClick={() => changerLettres(["g", "h", "i", "j", "k", "l"])}>G–L</button>
            <button onClick={() => changerLettres(["m", "n", "o", "p", "q", "r"])}>M–R</button>
            <button onClick={() => changerLettres(["s", "t", "u", "v", "w", "x", "y", "z"])}>S–Z</button>
        </Wrapper>
    )
}

const Wrapper = styled.nav`
    display: flex;
    gap: 15px;
    justify-content: center;
    button {
        padding: 5px 10px;
    }
`

export default SelectLettres;