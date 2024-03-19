import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
        box-sizing: border-box;
        color: var(--c10);
    }
    html {
        scrollbar-color: $coul6 $coul2;
    }
    body {
        background-color: var(--c1);
        font-family: "Trebuchet MS", Helvetica, sans-serif;
        margin: 0;
        padding: 0;
    }
    figcaption {
        font-size: small;
        font-style: italic;
        margin: 5px;
        text-align: center;
    }
    button {
        border-radius: 10px;
        &:not(:disabled):hover {
            background-color: var(--c1);
            cursor: pointer;
        }
    }
    input {
        border-radius: 10px;
    }
    :root {
        /* --c0: #9e5f32;
        --c1: #e8d4b0;
        --c2: #674023;
        --c3: #9d7753;
        --c4: #ad9169;
        --c5: #bda47d; */
        --c0: #400912;
        --c1: #B9E3C6;
        --c2: #23395B;
        --c3: #9d7753;
        --c4: #59C9A5;
        --c5: #FFFD98;
        --c10: #000;
        --c11: #fff;
    }
`