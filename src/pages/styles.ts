import styled, { css } from "styled-components";


export const Form = styled.form`
    margin-top: 40px;
    max-width: 1000px;
    width: 600px;
    position: fixed;
    top: -15px;
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
        }}
    
    p {
        font-size: 20px;
        position: absolute;
        top: 75px;
        left: 10px;
        color: white;
    }

    .search-btn {
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
    }}}

    .evolution-btn {
    position: absolute;
    z-index: 1000;
    opacity: 0;
    background-color: #000;
    cursor: pointer;
    top: 195px;
    left: 830px;
    width: 240px;
    height: 240px;
    }

`;

export const Imagem = styled.img`
    margin-top: 30px;
    max-width: 250px;
    max-height: 250px;
    width: 280px;
`;

export const MainPkm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 140px;
    border-radius: 30px;
    height: 400px;
    width: 450px;
    background-color: #fff;
    left: 110px;
`;

export const InfoPkm = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    height: 400px;
    border-radius:30px;
    width: 630px;
    background-color: #fff;
    top: 140px;
    left: 590px;
`;

export const Infoh1 = styled.p`
    font: bold 1.5rem 'Gemunu Libre', sans-serif;
    margin: 40px 40px 0 40px;
    text-align: left;
    width: 250px;
    `

export const TypeInfo = styled.p`
    font: bold 2rem 'Gemunu Libre', sans-serif;
    margin: 40px 40px 0 40px;
    text-align: left;
    width: 250px;
    text-transform: uppercase;
`;

export const TextEV = styled.p`
    font: bold 2rem 'Gemunu Libre', sans-serif;
    position: absolute;
    top: 40px;
    left: 370px;
    text-align: left;
    width: 250px;
    text-transform: uppercase;
`;
export const Imagemev = styled.img`
    position: absolute;
    top: 80px;
    left: 330px;
    width: 240px;
    height: 240px;
`;
