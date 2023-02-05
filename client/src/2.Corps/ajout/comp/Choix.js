import styled from "styled-components";

const Choix = ({ setEtape }) => {

    const choisirNouveau = () => setEtape(1);

    const choisirExistant = () => {
        setEtape(1);
    }
    
    return (
        <Wrapper>
            <button onClick={choisirNouveau}>Nouveau reçu</button>
            <button onClick={choisirExistant}>Modifier existant</button>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    justify-content: space-around;
`

export default Choix;