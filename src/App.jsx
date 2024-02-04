//Hooks
import { useState } from 'react'

//CSS
import './App.css'

//componentes
import StartGame from './components/StartGame'
import Game from './components/Game'


//Código
function App() {
  
  const [start,setStart] = useState(false)
  
  return (
    <div id='container'>
        {start == false?<StartGame setStart = {setStart}/>:<Game/>}
    </div>
  )
}

export default App
