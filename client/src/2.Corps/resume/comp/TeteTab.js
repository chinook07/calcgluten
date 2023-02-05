import styled from "styled-components";

const TeteTab = () => {
    return (
        <Wrapper>
            <tr>
                <th>Produit</th>
                <th>Qté.</th>
                <th>Coût régulier</th>
                <th>Coût SG</th>
                <th>Différentiel</th>
                <th>Déductible</th>
            </tr>
        </Wrapper>
    )
}

const Wrapper = styled.thead`
    th {
        padding: 5px;
    }
`

export default TeteTab;