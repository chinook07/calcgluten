import styled from "styled-components";

const Pied = () => {
    return (
        <Wrapper>
            <p>CalcGluten, une idée originale de Nicola</p>
        </Wrapper>
    )
}

const Wrapper = styled.footer`
    background-color: var(--c4);
    height: 100px;
    padding: 15px;
    p {
        margin: 0;
    }
`

export default Pied;