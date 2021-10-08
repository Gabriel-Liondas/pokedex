import React, { FormEvent, useEffect,  useState } from 'react';
import { Form, Imagem, MainPkm, InfoPkm, Infoh1, TypeInfo } from './styles';
import { HiSearch } from 'react-icons/hi';
import pokebolinha from '../assets/pokebolinha.gif';
import api from '../services/api';
import styled, { css } from "styled-components";


interface Pokemon {
        species: {name: string;}
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
    color: {name: string}
    flavor_text_entries : [
        {flavor_text : string, language : {name: string}},
        {flavor_text : string, language : {name: string}}, 
        {flavor_text : string, language : {name: string}}, 
        {flavor_text : string, language : {name: string}}, 
        {flavor_text : string, language : {name: string}}, 
        {flavor_text : string, language : {name: string}}, 
        {flavor_text : string, language : {name: string}}, ]
}

const Pokedex: React.FC = () => {
    const [newPokemon, setNewPokemon] = useState('');
    const [pokemonIMG, setPokemonIMG] = useState(pokebolinha);
    const [pokemonName, setPokemonName] = useState('waiting...');
    const [pokemonType, setPokemonType] = useState('');
    const [corNome, setcorNome] = useState('black');
    const [infoPkm, setInfoPkm] = useState('')

    
    async function getPokemon(event : FormEvent){
        event.preventDefault();
        const response = await api.get<Pokemon>(`pokemon/${newPokemon}`);
        const speciesResponse = await api.get<Species>(`pokemon-species/${newPokemon}`);

        const pokemon = response.data;
        const pokemonTypeOne = pokemon.types[0].type.name;


        for (var i in speciesResponse.data.flavor_text_entries) {
            if (speciesResponse.data.flavor_text_entries[i].language.name === "en") {
                setInfoPkm(speciesResponse.data.flavor_text_entries[i].flavor_text)
            }
        }
        setPokemonIMG(pokemon.sprites.versions['generation-v']['black-white'].animated.front_default)
        setPokemonName(`${pokemon.species.name}`)
        setcorNome( speciesResponse.data.color.name)
        console.log(corNome)
        if (speciesResponse.data.color.name === 'white') {
            setcorNome('gray')
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
        margin-top: 20px;
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
                <TypeInfo>{pokemonType}</TypeInfo>
                <Infoh1>{infoPkm}</Infoh1>
                <Infoh1></Infoh1>
            </InfoPkm>
        </>
    );
};


export default Pokedex;