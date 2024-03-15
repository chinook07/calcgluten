import styled from "styled-components";

const PiedTab = ({ grandTotal }) => {
    
    return (
        <Wrapper>
            <tr>
                <th>À déclarer</th>
                <td aria-hidden></td>
                <td aria-hidden></td>
                <td aria-hidden></td>
                <td aria-hidden></td>
                <th>{grandTotal} $</th>
            </tr>
        </Wrapper>
    )
}

const Wrapper = styled.tfoot`
    th {
        padding: 5px;
    }
`

export default PiedTab;