import React, { FormEvent, useEffect,  useState } from 'react';
import { Form, Imagem, MainPkm, InfoPkm, Infoh1, TypeInfo } from './styles';
import { HiSearch } from 'react-icons/hi';
import pokebolinha from '../assets/pokebolinha.gif';
import api from '../services/api';
import styled, { css } from "styled-components";


interface Pokemon {
        species: {
            name: string;
        }
        sprites: {
            versions : {['generation-v'] : { ['black-white'] : {animated : {front_default : string}}}},
            front_default: string
            }
        types : [ 
        {slot: number,
            type: {
                name: string
            }},
        {slot: number,
            type: {
                name: string
            }}
            ]
        }

interface Species {
    color: {
        name: string
    }}

const Pokedex: React.FC = () => {
    const [newPokemon, setNewPokemon] = useState('');
    const [pokemonIMG, setPokemonIMG] = useState(pokebolinha);
    const [pokemonName, setPokemonName] = useState('waiting...');
    const [pokemonType, setPokemonType] = useState(' ...');
    const [corNome, setcorNome] = useState('black');
    
    async function getPokemon(event : FormEvent){
        event.preventDefault();
        const response = await api.get<Pokemon>(`pokemon/${newPokemon}`);
        const speciesResponse = await api.get<Species>(`pokemon-species/${newPokemon}`);

        const pokemon = response.data;
        const pokemonTypeOne = pokemon.types[0].type.name;

        setPokemonIMG(pokemon.sprites.versions['generation-v']['black-white'].animated.front_default)
        setPokemonName(`${pokemon.species.name}`)
        setcorNome( speciesResponse.data.color.name)

        if (speciesResponse.data.color.name === 'white') {
            setcorNome('black')
        }
        if (pokemon.sprites.versions['generation-v']['black-white'].animated.front_default === null) {
            setPokemonIMG(pokemon.sprites.front_default)
        }

        if (pokemon.types.length > 1) {
            const pokemonTypeTwo = pokemon.types[1].type.name;
            setPokemonType(`${pokemonTypeOne} - ${pokemonTypeTwo}`)
        } else {
            setPokemonType(`${pokemonTypeOne}`)
            }
        }
    
        const Cabecalho = styled.h1`
        font: bold #fff 3rem 'Gemunu Libre', sans-serif;
        max-width: 1000px;
        text-align: center;
        width: 280px;
        text-transform: capitalize;
        color: ${corNome};
        `;

    return (
        <>
            <Form onSubmit={getPokemon}>
                    <input
                        type='text' 
                        placeholder='Digite o nome do pokemon' 
                        value = {newPokemon}
                        onChange={(e) => setNewPokemon(e.target.value)}
                    />
                    <button type='submit'><HiSearch className='search-icon' size="40px"/></button>
            </Form>
            <MainPkm>
                <Cabecalho>{pokemonName}</Cabecalho>
                <Imagem src={pokemonIMG} alt="pokemon" />
            </MainPkm>
            <InfoPkm>
                <TypeInfo>Type: &#9; {pokemonType}</TypeInfo>
                <Infoh1>Info: </Infoh1>
                <Infoh1>Evolution: </Infoh1>
            </InfoPkm>
        </>
    );
};


export default Pokedex;