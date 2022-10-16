import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Game, move, status, moves, aiMove, getFen } from 'js-chess-engine'
const game = new Game()
function App() {
  useEffect(() => { 
    console.log(game.moves());
  }, []);
  return (
    <div className=" h-screen text-center " style={{backgroundImage:'url("./images/Background.jpg")'}} >
      
      <div className='flex h-full'>
         <div className='basis-1/4 left-bar' >
asdasd
         </div>
         <div className='basis-1/2 w-fit    board'  >
          <div className=' w-full h-full ' style={{backgroundImage:'url("./images/chessboard-02.png")',backgroundRepeat:'no-repeat', backgroundPosition:'center' , backgroundSize:'auto 100%'}} >

          </div>
asadsa
         </div>
         <div className='basis-1/4 right-bar' >
asdas 
         </div>
      </div>
    </div>
  );
}

export default App;
