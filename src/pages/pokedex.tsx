import React, { FormEvent, useEffect,  useState } from 'react';
import { Form, Imagem, Cabecalho, MainPkm, InfoPkm, Infoh1 } from './styles';
import { HiSearch } from 'react-icons/hi';
import pokebolinha from '../assets/pokebolinha.gif';
import api from '../services/api';

interface Pokemon {
        species: {
            name: string;
        }
        sprites: {
            front_default: string;
            }
        types : [ {slot: number,
            type: {
                name: string
            }},
        {   slot: number,
            type: {
                name: string
            }}
        ]
    }



const Pokedex: React.FC = () => {
    const [newPokemon, setNewPokemon] = useState('');
    const [pokemonIMG, setPokemonIMG] = useState(pokebolinha);
    const [pokemonName, setPokemonName] = useState('loading...');
    const [pokemonType, setPokemonType] = useState('');

    async function getPokemon(event : FormEvent){
        event.preventDefault();
        const response = await api.get<Pokemon>(`pokemon/${newPokemon}`);
        const pokemon = response.data;
        const pokemonTypeOne = pokemon.types[0].type.name;

        setPokemonIMG(pokemon.sprites.front_default)
        setPokemonName(pokemon.species.name)

        if (pokemon.types.length > 1) {
            const pokemonTypeTwo = pokemon.types[1].type.name;
            setPokemonType(`${pokemonTypeOne} ${pokemonTypeTwo}`)
        } else {
            setPokemonType(`${pokemonTypeOne}`)
        }
    }



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
            <Imagem src={pokemonIMG} alt="charmander" />
        </MainPkm>

        <InfoPkm>
            <Infoh1>Tipo: &#9; {pokemonType}</Infoh1>
            <Infoh1>Info: </Infoh1>
            <Infoh1>Evolution: </Infoh1>
        </InfoPkm>

    </>
);
};

export default Pokedex;