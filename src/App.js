import React from 'react';
import { nanoid } from 'nanoid';
import { useStopwatch } from 'react-timer-hook';
import './App.css';
import Die from './components/Die/Die';
import Confetti from 'react-confetti';

function App() {
  const [dice, setDice] = React.useState(
    () => {
      return newDice();
    }
  );

  const [win, setWin] = React.useState(false);

  const [numRolls, setNumRolls] = React.useState(1);

  const stopwatch = useStopwatch({ autoStart: true });

  const [bestRecord, setBestRecord] = React.useState(
    () => {
      return JSON.parse(localStorage.getItem('bestRecord')) || null;
    }
  );

  React.useEffect(() => {
    setWin(false);
    if (dice.every(die => die.clicked) && dice.every(die => die.face === dice[0].face)) {
      setWin(true);

      const totalTime = stopwatch.seconds + stopwatch.minutes * 60 + stopwatch.hours * 3600;
      if (!bestRecord || totalTime < bestRecord.totalTime) {
        localStorage.setItem('bestRecord', JSON.stringify({
          seconds: stopwatch.seconds,
          minutes: stopwatch.minutes,
          hours: stopwatch.hours,
          totalTime,
        }));

        setBestRecord({
          seconds: stopwatch.seconds,
          minutes: stopwatch.minutes,
          hours: stopwatch.hours,
          totalTime,
        });
      }

      stopwatch.pause();
    }
  }, [dice]);

  function newDice() {
    const dice = [];
    for (let index = 0; index < 10; index ++) {
      dice.push({
        id: nanoid(),
        face: Math.ceil(Math.random() * 6),
        clicked: false,
      });
    }
    return dice;
  }

  function handleDieClick(id) {
    setDice(prevDice => {
      return prevDice.map(die => {
        return die.id === id ? 
          {
            ...die, 
            clicked: !die.clicked
          } : 
          die;
      });
    });
  }

  function rollDice() {
    if (win) {
      setNumRolls(1);
      stopwatch.reset();
    } else {
      setNumRolls(prevNumRolls => prevNumRolls + 1);
    }

    setDice(prevDice => {
      return prevDice.map(die => {
        return (die.clicked && !win) ? 
          die : 
          {
            ...die, 
            face: Math.ceil(Math.random() * 6),
            clicked: win ? false : die.clicked,
          };
      });
    });
  }

  const dieElements = dice.map((die) => {
    return (
      <Die 
        key={die.id}
        {...die}
        handleClick={() => handleDieClick(die.id)}
      />
    );
  });

  return (
    <div className="game-container">
      <h1 className="game-heading">Tenzies</h1>

      <h3 className="game-description">
        Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
      </h3>

      <h5 className="game-record">
        Roll #{numRolls} | Timer: {stopwatch.hours}:{stopwatch.minutes}:{stopwatch.seconds} {bestRecord && `| Best Record: ${bestRecord.hours}:${bestRecord.minutes}:${bestRecord.seconds}`}
      </h5>

      <div className="dice-container">
        {dieElements}
      </div>

      <button 
        className="roll-button"
        onClick={rollDice}
      >
        {win ? 'New Game' : 'Roll'}
      </button>

      {win && 
        <Confetti 
          className="confetti"
          width={document.querySelector(".game-container").offsetWidth} 
          height={document.querySelector(".game-container").offsetHeight} 
          />
      }
    </div>
  );
}

export default App;
