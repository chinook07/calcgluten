import styled from "styled-components";

const CorpsTab = ({ baseComp }) => {
    return (
        <Wrapper>
            {
                baseComp.map((item, index) => {
                    let prixVirgule;
                    if (typeof (item.prix) == "number") {
                        let prixArr = item.prix.toFixed(2);
                        prixVirgule = prixArr.replace(".", ",");
                    } else {
                        prixVirgule = item.prix
                    }
                    if (item.prixSG !== undefined) {
                        let prixSGArr = item.prixSG.toFixed(2);
                        let prixSGVirgule = prixSGArr.replace(".", ",");
                        if (item.qteAnnee !== 0) {
                            return (
                                <tr key={index}>
                                    <td>{item.aliment}</td>
                                    <td>{item.qteAnnee}</td>
                                    <Prix prixVirgule={prixVirgule}>{prixVirgule}</Prix>
                                    <Prix prixVirgule={prixVirgule}>{prixSGVirgule}</Prix>
                                    <Prix prixVirgule={prixVirgule}>{(item.prixSG - parseFloat(item.prix)).toFixed(2).replace(".", ",")}</Prix>
                                    <Prix prixVirgule={prixVirgule}>{item.admissible.toFixed(2).replace(".", ",")}</Prix>
                                </tr>
                            )
                        }
                    }
                })
            }
        </Wrapper>
    )
}

const Wrapper = styled.tbody``

const Prix = styled.td`
    color: ${props => props.prixVirgule === "0,00" && "red"};
    font-weight: ${props => props.prixVirgule === "0,00" && "bold"};
`

export default CorpsTab;