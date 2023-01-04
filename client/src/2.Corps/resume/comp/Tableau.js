import styled from "styled-components";

const Tableau = () => {
    return (
        <Wrapper>
            <thead>
                <tr>
                    <th>Produit</th>
                    <th>Qté.</th>
                    <th>Coût moyen</th>
                    <th>Coût avec gluten</th>
                    <th>Différentiel</th>
                    <th>Montant admissible</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>à venir</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </Wrapper>
    )
}

const Wrapper = styled.table`
    border: solid black 1px;
`

export default Tableau;