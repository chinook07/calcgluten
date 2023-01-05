import styled from "styled-components";

const Item = ({ majItems, ordre }) => {

    // const ajouterDollar = (e) => {
    //     console.log(e.target.value);
    //     e.target.value = `${e.target.value} $`
    // }

    const ajQte = (e) => {
        console.log(e.target.value);
    }

    return (
        <Wrapper>
            <div>
                <label>Quantité</label>
                <input
                    onChange={majItems}
                    ordre={ordre}
                    propriete="qte"
                    type="number"
                />
            </div>
            <div>
                <label>Item</label>
                <input
                    onChange={majItems}
                    ordre={ordre}
                    propriete="item"
                    type="text"
                />
            </div>
            <div>
                <label>Prix par unité</label>
                <div>
                    <input
                        onChange={majItems}
                        ordre={ordre}
                        propriete="prix"
                        type="number"
                    />
                    <span> $</span>
                </div>
                
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    gap: 5px;
    justify-content: space-evenly;
    div {
        label {
            left: -9999px;
            position: absolute;
        }
        input {
            border-radius: 5px;
            padding: 5px;
            width: 100px;
        }
        &:nth-child(2) input {
            width: 250px;
        }
    }
`

export default Item;