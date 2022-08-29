import './Die.css'

export default function Die({face, clicked, handleClick}) {
    return (
        <div 
            className={`die-container ${clicked ? 'clicked-die' : 'unclicked-die'}`}
            onClick={handleClick}
        >
            <div className={`die-point ${face === 1 ? 'die-point-hidden' : 'die-point-visible'}`}/>
            <div className="die-point die-point-hidden"/>
            <div className={`die-point ${(face === 1 || face === 2 || face === 3) ? 'die-point-hidden' : 'die-point-visible'}`}/>
            <div className={`die-point ${face === 6 ? 'die-point-visible' : 'die-point-hidden'}`}/>
            <div className={`die-point ${(face === 1 || face === 5 || face === 3) ? 'die-point-visible' : 'die-point-hidden'}`}/>
            <div className={`die-point ${face === 6 ? 'die-point-visible' : 'die-point-hidden'}`}/>
            <div className={`die-point ${(face === 1 || face === 2 || face === 3) ? 'die-point-hidden' : 'die-point-visible'}`}/>
            <div className="die-point die-point-hidden"/>
            <div className={`die-point ${face === 1 ? 'die-point-hidden' : 'die-point-visible'}`}/>
        </div>
    );
}
