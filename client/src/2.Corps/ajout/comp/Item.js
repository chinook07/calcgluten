import styled from "styled-components";

const Item = () => {
    return (
        <Wrapper>
            <div>
                <label>Quantité</label>
                <input type="number" />
            </div>
            <div>
                <label>Item</label>
                <input type="text" />
            </div>
            <div>
                <label>Prix par unité</label>
                <input type="number" />
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    gap: 5px;
    justify-content: space-evenly;
`

export default Item;