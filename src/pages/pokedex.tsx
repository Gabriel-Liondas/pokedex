import React, { FormEvent, useEffect,  useState } from 'react';
import { Title, Form} from './styles';



const pokedex: React.FC = () => {
return (
    <>
        <Form>
				<input
                    type='text' 
                    placeholder='Digite o nome do pokemon' 
                />
				<button type='submit'>Pesquisar</button>
			</Form>
        
    </>
);
};

export default pokedex;