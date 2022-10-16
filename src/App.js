import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Game, move, status, moves, aiMove, getFen } from 'js-chess-engine'
const game = new Game()
function App() {
  useEffect(() => { 
    console.log(game);
  }, []);
  let board = game.board.configuration.pieces;
    let boardArray = {};
    let xaxis={1:'A',2:'B',3:'C',4:'D',5:'E',6:'F',7:'G',8:'H'};
    let yaxis={1:'1',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8'};
    for (let i = 1; i <= 8; i++) {
      for (let j = 1; j <= 8; j++) {
        let piece = board[xaxis[i]+yaxis[j]];
        if (piece) {
          boardArray[xaxis[i]+yaxis[j]]=piece;
          // boardArray[i-1].push(piece);
        } else {
          boardArray[xaxis[i]+yaxis[j]]=" ";
        }

      }
    }
    console.log(boardArray);
    console.log(game.moves('D2','D4'));
    // 3,1
    
    const keys = Object.keys(boardArray)
  return (  
    // <Board boardArray={boardArray} />
    <div className=" h-screen text-center -z-50 " onClick={console.log(1)} style={{backgroundImage:'url("./images/Background.jpg")',backgroundRepeat:'no-repeat',backgroundPosition:'center',backgroundSize:'100% 100%'}} >

      <div className='flex h-full'>
         <div className='basis-1/4 left-bar' >
         </div>
         <div className='basis-1/2 w-fit px-20   -z-0 '  onClick={console.log(1)} >
          <div className=' w-full h-full pl-[12%] pr-[13%] pt-[5.9rem] py-[15.4rem] ' style={{backgroundImage:'url("./images/chessboard-02.png")',backgroundRepeat:'no-repeat', backgroundPosition:'center' , backgroundSize:'100% 100%'}} >
            <div className='bg-rd-400 h-[100%]  flex-col  'onClick={console.log(1)}  >
              
                <Board boardArray={boardArray} ></Board>
              
            </div>
          </div>
         </div>
         <div className='basis-1/4 right-bar' >
         </div>
      </div>
    </div>
  );
}
const Board = ({boardArray}) => {
  let x = [8 , 7 ,6 ,5 ,4 ,3 ,2 ,1];
  let y = ["A","B","C","D","E","F","G","H"]
  console.log('board arr',boardArray)
  var X = x.map( p =>  {
    var Y = y.map(s => {
      return (
      <div  key={s} className='flex-auto relative z-20 ' onClick={()=>console.log(s+p)} >
        {boardArray[s +p] !==" " && <img key={s+p} src={'./images/'+boardArray[s +p]+'.png'} className='z-10 h-40 top-[-6.5rem] left-[0rem] absolute pointer-events-none '/>} 
      </div>
      )
    })
  return ( 
       <div key={p} className='flex h-[12.5%] relative flex-auto w-full '>{Y}</div>
    )
  } )
  console.log("x is ",x)
  console.log("y is ",y)
  return (
    <>{X}</>
  )

}
export default App;


  // return (
  //   <>
  //   <div className='flex h-[12.5%] relative flex-auto w-full ' >
  //               <div className='flex-auto' ><img src='./images/p.png' className='h-40 top-[-6.5rem] left-[0rem] absolute  '   ></img>  </div>
  //               <div className='flex-auto'></div>
  //               <div className='flex-auto'></div>
  //               <div className='flex-auto relative'><img src='./images/i.png' className='h-40 top-[-6.5rem] left-[0rem] absolute '/></div>
  //               <div className='flex-auto relative'><img src='./images/b.png' className='h-40 top-[-6.5rem] left-[0rem] absolute '/></div>
  //               <div className='flex-auto relative'><img src='./images/q.png' className='h-40 top-[-6.5rem] left-[0rem] absolute '/></div>
  //               <div className='flex-auto relative'><img src='./images/r.png' className='h-40 top-[-6.5rem] left-[0rem] absolute '/></div>
  //               <div className='flex-auto relative'><img src='./images/k.png' className='h-40 top-[-6.5rem] left-[0rem] absolute '/></div>
  //             </div>
  //             <div className='flex h-[12.5%] relative flex-auto w-full ' >
  //               <div className='flex-auto bg-green-400 z-10'>  </div>
  //               <div className='flex-auto'></div>
  //               <div className='flex-auto'></div>
  //               <div className='flex-auto'></div>
  //               <div className='flex-auto'></div>
  //               <div className='flex-auto relative'><img src='./images/k.png' className='h-40 top-[-6.5rem] left-[0rem] absolute '/></div>
  //               <div className='flex-auto'></div>
  //               <div className='flex-auto'></div>
  //             </div>
  //             <div className='flex h-[12.5%]  flex-auto w-full ' >
  //               <div className='flex-auto'></div>
  //               <div className='flex-auto'></div>
  //               <div className='flex-auto'></div>   
  //               <div className='flex-auto'></div>
  //               <div className='flex-auto'></div>
  //               <div className='flex-auto'></div>
  //               <div className='flex-auto'></div>
  //               <div className='flex-auto'></div>
  //             </div>
  //             <div className='flex h-[12.5%]  flex-auto w-full ' >
  //               <div className='flex-auto'></div>
  //               <div className='flex-auto'></div>
  //               <div className='flex-auto'></div>
  //               <div className='flex-auto'></div>
  //               <div className='flex-auto'></div>
  //               <div className='flex-auto'></div>
  //               <div className='flex-auto'></div>
  //               <div className='flex-auto'></div>
  //             </div>
  //             <div className='flex h-[12.5%]  flex-auto w-full ' >
  //               <div className='flex-auto'></div>
  //               <div className='flex-auto'></div>
  //               <div className='flex-auto'></div>
  //               <div className='flex-auto'></div>
  //               <div className='flex-auto'></div>
  //               <div className='flex-auto'></div>
  //               <div className='flex-auto'></div>
  //               <div className='flex-auto'></div>
  //             </div>
  //             <div className='flex h-[12.5%]  flex-auto w-full ' >
  //               <div className='flex-auto'></div>
  //               <div className='flex-auto'></div>
  //               <div className='flex-auto'></div>
  //               <div className='flex-auto'></div>
  //               <div className='flex-auto'></div>
  //               <div className='flex-auto'></div>
  //               <div className='flex-auto'></div>
  //               <div className='flex-auto'></div>
  //             </div>
  //             <div className='flex h-[12.5%]  flex-auto w-full ' >
  //               <div className='flex-auto'></div>
  //               <div className='flex-auto'></div>
  //               <div className='flex-auto'></div>
  //               <div className='flex-auto'></div>
  //               <div className='flex-auto'></div>
  //               <div className='flex-auto'></div>
  //               <div className='flex-auto'></div>
  //               <div className='flex-auto'></div>
  //             </div>
  //             <div className='flex h-[12.5%]  flex-auto w-full ' >
  //               <div className='flex-auto'></div>
  //               <div className='flex-auto'></div>
  //               <div className='flex-auto'></div>
  //               <div className='flex-auto'></div>
  //               <div className='flex-auto'></div>
  //               <div className='flex-auto'></div>
  //               <div className='flex-auto'></div>
  //               <div className='flex-auto'></div>
  //             </div>
  //   </>
  // )