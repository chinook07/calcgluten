import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
        box-sizing: border-box;
    }
    html {
        scrollbar-color: $coul6 $coul2;
    }
    body {
        font-family: "Trebuchet MS", Helvetica, sans-serif;
        margin: 0;
    }
    figcaption {
        font-size: small;
        font-style: italic;
        margin: 5px;
        text-align: center;
    }
    :root {
        --c0: #e8def3;
        --c1: #e9d985;
        --c2: #b2bd7e;
        --c3: #749c75;
        --c4: #0e3b10;
        --c5: #6a5d7b;
        --c6: #5d4a66;
        --c10: #000;
        --c11: #fff;
    }
`