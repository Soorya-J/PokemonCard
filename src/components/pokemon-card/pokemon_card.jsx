import React, { useEffect, useRef, useState } from 'react';
import VanillaTilt from 'vanilla-tilt';
import './pokemon_card.css';
import poke_ball from '../assets/pokeball.png';

function PkCard() {
  const  inputref = useRef(null);

  useEffect(() => {
    const tiltElements = document.querySelectorAll('.card');
    VanillaTilt.init(tiltElements, {
      max: 5,
      speed: 10,
      glare: true,
      'max-glare': 0.5
    });
  }, []);
  const [pokeData,setPokeData] = useState({
    
    ability: 'ability',
    stat: 'stat',
    weight: 'wh',
    height: 'h',
    name:'name',
    moves:'moves',
    items:'items',
    species:'species',
    image: poke_ball

});

  const search = async () => {

     if (inputref.current.value === ''){
      alert('search cannot be blank');
      return false;
     }

    try {
          const url = `https://pokeapi.co/api/v2/pokemon/${inputref.current.value}`;
          const response = await fetch(url);

          if (!response.ok) {
            throw new Error('no pokemon found blaa');
          }

          const data = await response.json();
          console.log(data);

          setPokeData(
            {
              ability:data.abilities[0].ability.name ,
              stat: data.stats[0].base_stat,
              weight:data.weight,
              height: data.height,
              name:data.name,
              moves:data.moves[0].move.name,
              items:data.held_items[0].item.name,
              species:data.species.name,
              image:data.sprites.front_default
            }
          )


    } catch (error) {
      console.error('error fetching data from api:', error.message);
    }
  };


  return (
    <div className='container'>
      <div className="card">
        <div className="pokemon-details">
          <div className="pokemon-ability-hp">
            <div className="pokemon-ability">{pokeData.ability}</div>
            <div className="pokemon-hp">hp <span>{pokeData.stat}</span></div>
          </div>
          <div className="pokemon-image">
            <img src={pokeData.image} alt="pokemon" />
          </div>
          <div className="weight-height">
            <h5 className="weight">{pokeData.weight}<span>kg</span></h5>
            <h5 className="height"><span>HT:</span>{pokeData.height}</h5>
          </div>
          <div className="namebar">
            <h4 className="name">{pokeData.name}</h4>
          </div>
          <div className="moves-items">
            <div className="moves">
              <span className="movename">{pokeData.moves}</span>
            </div>
            <div className="items">
              <span className="itemname">{pokeData.items}</span>
            </div>
          </div>
          <div className="species">
            <span className='nametag'>species:</span><span className="species_name">{pokeData.species}</span>
          </div>
        </div>
      </div>
      <div className="searchbtn">
        <input ref={inputref} type="text" placeholder='search' />
        <button onClick={search} className='search-btn'>search</button>
      </div>
    </div>
  );
}

export default PkCard;

