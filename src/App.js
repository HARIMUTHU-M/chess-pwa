import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Game, move, status, moves, aiMove, getFen } from 'js-chess-engine'
const game = new Game()
function App() {
  useEffect(() => { 
    console.log(game);
  }, []);
  return (  
    <div className=" h-screen text-center " style={{backgroundImage:'url("./images/Background.jpg")',backgroundRepeat:'no-repeat',backgroundSize:'100% 100%'}} >
      
      <div className='flex h-full'>
         <div className='basis-1/4 left-bar' >
         </div>
         <div className='basis-1/2 w-fit px-20   board'  >
          <div className=' w-full h-full pl-[12%] pr-[13%] pt-[5.9rem] py-[15.4rem] ' style={{backgroundImage:'url("./images/chessboard-02.png")',backgroundRepeat:'no-repeat', backgroundPosition:'center' , backgroundSize:'100% 100%'}} >
            <div className='bg-rd-400 h-[100%]  flex-col  ' >
              <div className='flex h-[12.5%] relative flex-auto w-full ' >
                <div className='flex-auto' ><img src='./images/p.png' className='h-40 top-[-6.5rem] left-[0rem] absolute  '   ></img>  </div>
                <div className='flex-auto'></div>
                <div className='flex-auto'></div>
                <div className='flex-auto relative'><img src='./images/i.png' className='h-40 top-[-6.5rem] left-[0rem] absolute '/></div>
                <div className='flex-auto relative'><img src='./images/b.png' className='h-40 top-[-6.5rem] left-[0rem] absolute '/></div>
                <div className='flex-auto relative'><img src='./images/q.png' className='h-40 top-[-6.5rem] left-[0rem] absolute '/></div>
                <div className='flex-auto relative'><img src='./images/r.png' className='h-40 top-[-6.5rem] left-[0rem] absolute '/></div>
                <div className='flex-auto relative'><img src='./images/k.png' className='h-40 top-[-6.5rem] left-[0rem] absolute '/></div>
              </div>
              <div className='flex h-[12.5%] relative flex-auto w-full ' >
                <div className='flex-auto bg-green-400 z-10'>  </div>
                <div className='flex-auto'></div>
                <div className='flex-auto'></div>
                <div className='flex-auto'></div>
                <div className='flex-auto'></div>
                <div className='flex-auto relative'><img src='./images/k.png' className='h-40 top-[-6.5rem] left-[0rem] absolute '/></div>
                <div className='flex-auto'></div>
                <div className='flex-auto'></div>
              </div>
              <div className='flex h-[12.5%]  flex-auto w-full ' >
                <div className='flex-auto'></div>
                <div className='flex-auto'></div>
                <div className='flex-auto'></div>
                <div className='flex-auto'></div>
                <div className='flex-auto'></div>
                <div className='flex-auto'></div>
                <div className='flex-auto'></div>
                <div className='flex-auto'></div>
              </div>
              <div className='flex h-[12.5%]  flex-auto w-full ' >
                <div className='flex-auto'></div>
                <div className='flex-auto'></div>
                <div className='flex-auto'></div>
                <div className='flex-auto'></div>
                <div className='flex-auto'></div>
                <div className='flex-auto'></div>
                <div className='flex-auto'></div>
                <div className='flex-auto'></div>
              </div>
              <div className='flex h-[12.5%]  flex-auto w-full ' >
                <div className='flex-auto'></div>
                <div className='flex-auto'></div>
                <div className='flex-auto'></div>
                <div className='flex-auto'></div>
                <div className='flex-auto'></div>
                <div className='flex-auto'></div>
                <div className='flex-auto'></div>
                <div className='flex-auto'></div>
              </div>
              <div className='flex h-[12.5%]  flex-auto w-full ' >
                <div className='flex-auto'></div>
                <div className='flex-auto'></div>
                <div className='flex-auto'></div>
                <div className='flex-auto'></div>
                <div className='flex-auto'></div>
                <div className='flex-auto'></div>
                <div className='flex-auto'></div>
                <div className='flex-auto'></div>
              </div>
              <div className='flex h-[12.5%]  flex-auto w-full ' >
                <div className='flex-auto'></div>
                <div className='flex-auto'></div>
                <div className='flex-auto'></div>
                <div className='flex-auto'></div>
                <div className='flex-auto'></div>
                <div className='flex-auto'></div>
                <div className='flex-auto'></div>
                <div className='flex-auto'></div>
              </div>
              <div className='flex h-[12.5%]  flex-auto w-full ' >
                <div className='flex-auto'></div>
                <div className='flex-auto'></div>
                <div className='flex-auto'></div>
                <div className='flex-auto'></div>
                <div className='flex-auto'></div>
                <div className='flex-auto'></div>
                <div className='flex-auto'></div>
                <div className='flex-auto'></div>
              </div>
            </div>
          </div>
         </div>
         <div className='basis-1/4 right-bar' >
         </div>
      </div>
    </div>
  );
}

export default App;


// var Object = {
//   a : [1,2,3,4,5],
//   b : [1,23,4,5,6]
// } 

// Object['a'][2] = 5 ;
// Object['a' ] = [...Object['a']]
// setObject(Object)