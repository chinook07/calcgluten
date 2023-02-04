import styled from "styled-components";

const TeteTab = () => {
    return (
        <Wrapper>
            <tr>
                <th>Produit</th>
                <th>Qté.</th>
                <th>Coût avec gluten</th>
                <th>Coût sans gluten</th>
                <th>Différentiel</th>
                <th>Montant admissible</th>
            </tr>
        </Wrapper>
    )
}

const Wrapper = styled.thead``

export default TeteTab;