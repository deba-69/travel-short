import React from 'react';
import CardItem from './CardItem';
import './Cards.css';

function Cards(props) {
  return (
    <div className='cards'>
      <h1>Check out these epic destinations!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
             <CardItem 
             src="Devkund.png"
             text="Explore the hidden waterfall deep inside the Jungle"
             label="Adventure"
            path="/place/1"
            ></CardItem>
            <CardItem 
            src="Sondai.png"
            text="Hidden gem in Karjat!"
            label="Adventure"
            path="/place/2"
            ></CardItem>
          </ul>
          <ul className='cards__items'>
            <CardItem 
            src="Kalsubai.jpg"
            text="Highest Peak of Maharashtra!"
            label="Adventure"
            path="/place/3"
            ></CardItem>
            <CardItem 
            src="Harishchandra.png"
            text="Strongly Fortified "
            label="Adventure"
            path="/place/4"
            ></CardItem>
            <CardItem 
           src="Aadrai.jpg"
           text="Unexplored jungle Trek!"
           label="Adventure"
            path="/place/5"
            ></CardItem> 
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Cards;
