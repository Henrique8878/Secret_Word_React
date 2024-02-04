import React, { useState } from "react";
import './EndGame.css'
import Game from "./Game";


const EndGame = ({pointing,setPointing})=>{

    const [restart,setRestart] = useState(false)
    return(
        <>
        {restart==true?<Game/>:  <div id="div_end_game" style={{color:"white",fontWeight:"bold"}}>
            <h1>Fim de Jogo !</h1>
            <h4>A sua pontuação foi: <span style={{color:"yellow"}}>{pointing}</span></h4>
            <button onClick={()=>
                {
                    setRestart(true)
                    setPointing(0)

                }
                }>Reiniciar Jogo</button>
        </div>}
      
        </>
    
    )
}

export default EndGame;

