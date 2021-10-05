import styled, { css } from "styled-components";
import { shade } from 'polished';

export const Form = styled.form`
    margin-top: 40px;
    max-width: 1000px;
    width: 600px;
    position: fixed;
    top: 0px;
    left: 90px;
    display: flex;

    input {
        flex: 1;
        height: 70px;
        padding: 0 24px;
        border: 2px solid #fff;
        border-right: none;
        border-radius: 20px 0 0 20px;
        color: #3a3a3a;

        &::placeholder {
            color: #a8a8b3;;
        }
    }

    button {
    width: 70px;
    height: 70px;
    border: none; 
    border-radius: 0 20px 20px 0;
    color: #3a3a3a;
    font-weight: 700;
    background: white;

    .search-icon{
        color: #423B3B;
        transition: all .1s ease-in-out;

        &:hover {
                transform:scale(110%);
                
            }
    }
    }
`;
export const Cabecalho = styled.h1`
    margin-top: 40px;
    font: bold 3rem 'Gemunu Libre', sans-serif;
    max-width: 1000px;
    width: 280px;
    position: fixed;
    top: 130px;
`;
export const Imagem = styled.img`
    margin-top: 40px;
    max-width: 1000px;
    width: 280px;
    position: fixed;
    top: 210px;
    left: 200px;
`;

