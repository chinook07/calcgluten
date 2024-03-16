import styled from "styled-components";
import { keyframes } from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faBreadSlice } from "@fortawesome/free-solid-svg-icons";

const grillePain = keyframes`
    0% {transform: rotate(0)};
    25% {transform: rotate(90deg)};
    50% {transform: rotate(180deg)};
    75% {transform: rotate(270deg)};
    100% {transform: rotate(360deg)};
`

const Chargement = () => {
    return (
        <Pain icon={faBreadSlice} size="3x" />
    )
}

const Pain = styled(FontAwesomeIcon)`
    animation: ${grillePain} 1s linear infinite;
    display: block;
    margin: 10px auto;
`

export default Chargement;