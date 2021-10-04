import React from 'react';
import Pokedex from './pages/pokedex'
import GlobalStyles from './styles/global';


const App : React.FC = () => {
  return (
    <>
      <Pokedex />
      <GlobalStyles />
    </>
  );
};

export default App;