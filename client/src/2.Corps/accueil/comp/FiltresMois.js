import styled from "styled-components";

const FiltresMois = ({ lesTrimestres, trimestreChoisi, setTrimestreChoisi }) => {

    const choisirTrimestre = (trimestre) => {
        trimestre === trimestreChoisi ? setTrimestreChoisi(undefined) : setTrimestreChoisi(trimestre)
    }

    return (
        <Wrapper>
            <ul>
                {
                    lesTrimestres.map((item, index) => {
                        return (
                            <Trimestre
                                ceTrimestre={item.trimestre}
                                key={index}
                                onClick={() => choisirTrimestre(item.trimestre)}
                                trimestreChoisi={trimestreChoisi}
                            >{item.mois}</Trimestre>
                        )
                    })
                }
            </ul>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    background-color: var(--c3);
    ul {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        list-style-type: none;
    }
`

const Trimestre = styled.li`
    background-color: var(${props => props.trimestreChoisi === props.ceTrimestre ? "--c2" : "--c4"});
    color: var(${props => props.trimestreChoisi === props.ceTrimestre ? "--c11" : "--c10"});
    cursor: pointer;
    padding: 10px;
`

export default FiltresMois;