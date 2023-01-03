import { BrowserRouter } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Entete from "./1.Entete/Entete";
import Corps from "./2.Corps/Corps";
import Pied from "./3.Pied/Pied";

const App = () => {
    return (
        <>
            <GlobalStyles />
            <BrowserRouter>
                <Entete />
                <Corps />
                <Pied />
            </BrowserRouter>
        </>
    );
}

export default App;
