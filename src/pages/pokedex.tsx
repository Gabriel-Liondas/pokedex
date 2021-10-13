import React, { FormEvent, useEffect,  useState } from 'react';
import { Form, MainPkm, InfoPkm, Infoh1, TypeInfo, Imagem, Imagemev, TextEV } from './styles';
import { HiSearch } from 'react-icons/hi';
import pokebolinha from '../assets/pokebolinha.gif';
import max_lv from '../assets/max-lv.svg';
import api from '../services/api';
import styled, { css } from "styled-components";

// INTERFACES
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
    color: {name: string},
    evolution_chain : {url : string},
    flavor_text_entries : [
        {flavor_text : string, language : {name: string}},
        {flavor_text : string, language : {name: string}}, 
        {flavor_text : string, language : {name: string}}, 
        {flavor_text : string, language : {name: string}}, 
        {flavor_text : string, language : {name: string}}, 
        {flavor_text : string, language : {name: string}}, 
        {flavor_text : string, language : {name: string}}, ]
}
interface EvolutionChainOne {
    chain : {
        evolves_to : [{
                species: {name: string}
                evolves_to : [{species: {name: string}}]
            }]
    }
}


const Pokedex: React.FC = () => {

    //Const's useState
    const [newPokemon, setNewPokemon] = useState('');
    const [pokemonIMG, setPokemonIMG] = useState(pokebolinha);
    const [pokemonName, setPokemonName] = useState('waiting...');
    const [pokemonType, setPokemonType] = useState('-');
    const [evolutionIMG, setEvolutionIMG] = useState(max_lv);
    const [evolutionName, setEvolutionName] = useState('');
    const [corNome, setcorNome] = useState('black');
    const [infoPkm, setInfoPkm] = useState('-')

    
    async function getPokemon(event : FormEvent){
        event.preventDefault();

        if (newPokemon === '') {
            setNewPokemon('')
            setPokemonIMG(pokebolinha);
            setPokemonName('waiting...');
            setPokemonType('-');
            setEvolutionIMG(max_lv);
            setEvolutionName('');
            setcorNome('black');
            setInfoPkm('-')
        } else {
        //Pesquisas Api
        const response = await api.get<Pokemon>(`pokemon/${newPokemon}`);
        const speciesResponse = await api.get<Species>(`pokemon-species/${newPokemon}`);
        const evolutionResponse = await api.get<EvolutionChainOne>(`${speciesResponse.data.evolution_chain.url}`)

        //variáveis .data
        const pokemon = response.data;
        const pokemonTypeOne = pokemon.types[0].type.name;
        const evolChain = evolutionResponse.data.chain

        //setStates iniciais
        setPokemonIMG(pokemon.sprites.versions['generation-v']['black-white'].animated.front_default)
        setPokemonName(`${pokemon.species.name}`)
        setcorNome( speciesResponse.data.color.name)

        //setStates SpeciesResponses
        for (var i in speciesResponse.data.flavor_text_entries) {
            if (speciesResponse.data.flavor_text_entries[i].language.name === "en") {
                setInfoPkm(speciesResponse.data.flavor_text_entries[i].flavor_text)
            }
        }
        if (speciesResponse.data.color.name === 'white') {
            setcorNome('gray')
        }

        //setStates Pokemon
        if (pokemon.sprites.versions['generation-v']['black-white'].animated.front_default === null) {
            setPokemonIMG(pokemon.sprites.front_default)
        }
        if (pokemon.types.length > 1) {
            const pokemonTypeTwo = pokemon.types[1].type.name;
            setPokemonType(`${pokemonTypeOne} - ${pokemonTypeTwo}`)
        } else {
            setPokemonType(`${pokemonTypeOne}`)}

        
        //setStates evolChain validação
        if (evolChain.evolves_to === undefined) {
            setEvolutionIMG(max_lv)
            setNewPokemon('')
        } else if (evolChain.evolves_to[0] == null) {
            setEvolutionIMG(max_lv)
            setNewPokemon('')
        } else if (evolChain.evolves_to[0].evolves_to[0] == null && evolChain.evolves_to[0].species.name != pokemon.species.name) {
            const evolutionChain = await api.get<Pokemon>(`pokemon/${evolChain.evolves_to[0].species.name}`)
            setEvolutionIMG(evolutionChain.data.sprites.front_default)
            setEvolutionName(evolutionChain.data.species.name)
        } else if (evolChain.evolves_to[0].evolves_to[0] == null && evolChain.evolves_to[0].species.name == pokemon.species.name) {
            setEvolutionIMG(max_lv)
            setNewPokemon('')
        } else if (evolChain.evolves_to[0].species.name != pokemon.species.name) {
            if (evolChain.evolves_to[0].evolves_to[0].species.name != pokemon.species.name) {
                const evolutionChain = await api.get<Pokemon>(`pokemon/${evolChain.evolves_to[0].species.name}`)
                setEvolutionIMG(evolutionChain.data.sprites.front_default)
                setEvolutionName(evolutionChain.data.species.name)
            } else {
                setEvolutionIMG(max_lv)
                setNewPokemon('')
            }
        } else if (evolChain.evolves_to[0].species.name == pokemon.species.name) {
            const evolutionChain = await api.get<Pokemon>(`pokemon/${evolChain.evolves_to[0].evolves_to[0].species.name}`)
            setEvolutionIMG(evolutionChain.data.sprites.front_default)
            setEvolutionName(evolutionChain.data.species.name)
        } else {
            setEvolutionIMG(pokebolinha)
        }}
        setNewPokemon('')
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
            
            <MainPkm>
                <Cabecalho>{pokemonName}</Cabecalho>
                <Imagem src={pokemonIMG} alt="pokemon" />
            </MainPkm>
            <InfoPkm>
                <TypeInfo>Type: {pokemonType}</TypeInfo>
                <Infoh1>Info: {infoPkm}</Infoh1>
                <TextEV>Evolves to:</TextEV>
                <Imagemev 
                    src={evolutionIMG}
                />
            </InfoPkm>
            <Form onSubmit={getPokemon}>
                    <input
                        type='text' 
                        placeholder='Digite o nome do pokemon' 
                        value = {newPokemon.toLowerCase()}
                        onChange={(e) => setNewPokemon(e.target.value)}
                        spellCheck= {false}
                    />
                    <button 
                        type='submit'
                        className='search-btn'>
                    <HiSearch className='search-icon' size="40px"/>
                    </button>
                    <button
                        className='evolution-btn'
                        value= {evolutionName}
                        onClick={(e) => setNewPokemon(evolutionName)}
                        type='submit'
                    ></button>
            </Form>
        </>
    );
};


export default Pokedex;