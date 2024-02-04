
//HOOKS
import React, { useState, useRef, useEffect } from "react";
//UseRef , consigo acessar elementos do DOM
//FIM HOOKS

//CSS

import './Game.css';

//FIM CSS

//COMPONENTS
import EndGame from "./EndGame";
//FIM COMPONENTS



const Game = () => {
    //STATES/////////////////////
    const [words] = useState([
        "Abacate", "Bola", "Cachorro", "Dente", "Elefante",
        "Faca", "Gato", "Helicóptero", "Igreja", "Janela",
        "Kiwi", "Lápis", "Montanha", "Navio", "Ovelha",
        "Piano", "Queijo", "Rato", "Sapato", "Tigre",
        "Uva", "Vela", "Xícara", "Yoga", "Zebra",
        "Morango", "Banana", "Computador", "Foguete", "Teclado"
    ]);

    let [dicas] = useState([
        "Fruta", "Esporte", "Animal", "Parte", "Animal",
        "Utensílio", "Animal", "Veículo", "Religião", "Construção",
        "Fruta", "Instrumento", "Elevação", "Embarcação", "Animal",
        "Instrumento", "Alimento", "Roedor", "Calçado", "Animal",
        "Fruta", "Iluminação", "Recipientes", "Prática", "Animal",
        "Fruta", "Fruta", "Dispositivo", "Veículo", "Dispositivo"
    ]);
    
    const [pointing, setPointing] = useState(0);
    const [clue, setCLue] = useState("");
    const [attempts, setAttempts] = useState(4);
    const [arrayLetter, setArrayLetter] = useState([]);
    const [letterUsed, setLetterUsed] = useState([]);
    const [oneLetter, setOneLetter] = useState("");
    const [array, setArray] = useState([]);
    const [startFunction, setStartFunction] = useState(true);
    const [letterFound,setLetterFound] = useState()
    const [new_word,setNewWord] = useState([])
    const [endGame,setEndGame] = useState(false)
    //FIM STATES//////////////////

    //MYInputRef uso como referência no elemento que eu quero do DOM
    const MyInputRef = useRef(null);
    const SpanRef = useRef(null)

    let array_letras = []

    
    // FUNCTIONS/////////////////////

    // Pega as palavras e adiciona em uma array, para formar uma palavra na adivinhação
    useEffect(() => {
        if (startFunction) {
            let RandomNumber = Math.floor(Math.random() * 30);
            let word = words[RandomNumber].toUpperCase().split('');
            setArray(word);
            setStartFunction(false);
            setCLue(dicas[RandomNumber])
        }

        for(let i = 0;i<array.length;i++){

            SpanRef.current.childNodes[i].textContent = ""
    }
    }, [startFunction, words]);

    // Verifica se o input só tem uma letra
   

    // Pega valor do input
    const pickValue = (e) => {
        const valor = e.target.value;
        setOneLetter(e.target.value);
        
    
        // Verifica se o input só tem uma letra e desabilita se necessário
        if (valor.trim().length === 1) {//trim retira os espaços em branco
            MyInputRef.current.setAttribute("disabled", "true");
        } else {
            MyInputRef.current.removeAttribute("disabled");
        }
    }

 
    //habilitar input e apagar letra

    const remove_letter = ()=>{
        setOneLetter("")
        MyInputRef.current.value = ""
        MyInputRef.current.removeAttribute("disabled")
        
    }

    //Verificar Se os inputs das palavras estão completos, para somar os pontos
    const CheckWordComplete = ()=>{
        const ConversionArray = Array.from(SpanRef.current.childNodes)

       const Verification = ConversionArray.some((letter)=>letter.textContent == "")

        if(Verification==false){
            setPointing(pointing+100)
            setStartFunction(true)
        }
    }

    //Terminar partida

    const Game_Over = ()=>{
        if(attempts==0){
            
        }
    }
    

    //jogar

    const Play = ()=>{
        MyInputRef.current.value = ""
        MyInputRef.current.removeAttribute("disabled")
        for(let i = 0;i<array.length;i++){
            if(oneLetter.toUpperCase()==array[i]){
                SpanRef.current.childNodes[i].textContent = oneLetter
            }
        }

        const TrueOrFalse = array.some(Num=>Num==oneLetter.toUpperCase())

        if(TrueOrFalse==false){
            setAttempts(attempts-1)
            const newArray = [...letterUsed]
            newArray.push(oneLetter)
            setLetterUsed(newArray)
        }
        
      CheckWordComplete()
     
}

Game_Over()

    //FIM FUNCTIONS//////////////////

    return (

        
        <div>
            {attempts==0?<EndGame pointing = {pointing} setPointing = {setPointing}/>:
            <div id="container_game">
                <p>Pontuação: {pointing}</p>
                <h1>Advinhe a palavra</h1>
                <h3>Dica sobre a palavra: <span style={{color:"yellow"}}>{clue}</span></h3>
                <p>Você ainda tem {attempts} tentativa(s).</p>
                <div id="game_boxes" ref={SpanRef}>
                    {array.map((word, index) => (
                        <div key={index} className="box_letter">
                            <span id="invisible">{word}</span>
                        </div>
                    ))}
                </div>
                <p>Tente advinhar uma letra da palavra</p>
                <div id="div_btn_play">
                    <button onClick={remove_letter}>Apagar letra</button>
                    <input type="text" name="letter" id="inp_letter" onChange={pickValue} ref={MyInputRef} />
                    <button id="btn_play" onClick={Play}>Jogar</button>
                </div>
                <p>Letras já utilizadas: {`${letterUsed} `}</p>
            </div>
            }
        </div>
    );
}

export default Game;
