import { createGlobalStyle } from 'styled-components';
import pokebacground from '../assets/background.svg'

export default createGlobalStyle `
  *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    }

    body {
    background: #8a2d19 url(${pokebacground}) no-repeat;
    background-size: 1325px 650px;
    }

    body, input, button {
    font: 2rem 'Gemunu Libre', sans-serif;}

    #root {
        max-width: 960px;
        margin: 0 auto;
        padding: 40px 20px;
    }

    button {
        cursor: pointer;
    }
`