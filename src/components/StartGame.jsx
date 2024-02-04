import React from "react";
import './StartGame.css'

const StartGame = ({setStart})=>{

    
    return(
        <div id="container_start_game">
            <h1>Secret Word</h1>
            <p>Clique no botão abaixo para começar a jogar</p>

            <button onClick={()=>setStart(true)}>Começar jogo</button>
        </div>
    )
}

export default StartGame;