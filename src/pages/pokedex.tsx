import React, { FormEvent, useEffect,  useState } from 'react';
import { Form, Imagem, Cabecalho } from './styles';
import { HiSearch } from 'react-icons/hi';
import pokebolinha from '../assets/pokebolinha.png'
import api from '../services/api';

interface Pokemon {
        species: {
            name: string;
        }
        sprites: {
            front_default: string;
            }
    }



const Pokedex: React.FC = () => {
    const [newPokemon, setNewPokemon] = useState('');
    const [pokemonIMG, setPokemonIMG] = useState(pokebolinha);
    const [pokemonName, setPokemonName] = useState('');
    async function getPokemon(event : FormEvent){
        event.preventDefault();
        const response = await api.get<Pokemon>(`pokemon/${newPokemon}`);
        console.log(typeof(response))
        console.log(response.data)
        const pokemon = response.data;
        setPokemonIMG(pokemon.sprites.front_default)
        setPokemonName(pokemon.species.name)

        console.log(typeof(pokemon))

        

        setNewPokemon('')
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
        
        <Imagem src={pokemonIMG} alt="charmander" />
        <Cabecalho>{pokemonName}</Cabecalho>
    </>
);
};

export default Pokedex;