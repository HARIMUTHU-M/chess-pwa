import { useState, useEffect } from "react";
import { Game } from "js-chess-engine";
import "../App.css";

const game = new Game();

function App() {
  const [boardArray2, setBoardArray2] = useState({});
  const [difficulty, setDifficulty] = useState(0);
  // eslint-disable-next-line no-unused-vars
  let keys = Object.keys(boardArray2);
  let board = game.exportJson().pieces;

  function setCurrBoard() {
    let boardArray = {};
    let xaxis = {
      1: "A",
      2: "B",
      3: "C",
      4: "D",
      5: "E",
      6: "F",
      7: "G",
      8: "H",
    };
    let yaxis = {
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      8: "8",
    };

    for (let i = 1; i <= 8; i++) {
      board = game.exportJson().pieces;
      for (let j = 1; j <= 8; j++) {
        let piece = board[xaxis[i] + yaxis[j]];
        if (piece) {
          boardArray[xaxis[i] + yaxis[j]] = piece;
        } else {
          boardArray[xaxis[i] + yaxis[j]] = " ";
        }
      }
    }

    setBoardArray2({ ...boardArray });
    keys = Object.keys(boardArray2);
    console.log(board);
  }

  useEffect(() => {
    setCurrBoard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [possibleMoves, setPossibleMoves] = useState([]);
  const [fromPosition, setfromPosition] = useState("");
  const [history, setHistory] = useState("");

  const tempFn = (x, coin) => {
    console.log(game.exportJson());
    if (possibleMoves.length > 0 && possibleMoves.includes(x)) {
      console.log("Possible Moves", possibleMoves);
      console.log(fromPosition + " " + x);

      console.log(game.getHistory());

      setHistory(history + "  " + fromPosition + "-" + x);

      game.move(fromPosition, x);
      console.log(game.exportJson().pieces);
      setCurrBoard();
      console.log("Done");
      setfromPosition("");

      game.aiMove(difficulty);
      setCurrBoard();
      setPossibleMoves([...[]]);
    } else if (possibleMoves.length > 0) {
      setPossibleMoves([...[]]);
    } else {
      console.log(x + " " + coin);
      setPossibleMoves([...game.moves(x)]);
      setfromPosition(x);
      //   console.log("Possible Moves", possibleMoves);
    }
  };

  return (
    <div
      className=" h-screen -z-50 "
      style={{
        backgroundImage: 'url("./images/Background.jpg")',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "100% 100%",
      }}
    >
      <div className="flex h-full">
        <div className="basis-1/4 left-bar"></div>

        {/* CHESSBOARD */}
        <div className="basis-1/2 w-fit px-20 -z-0 ">
          <div
            className=" w-[34rem]  h-[37rem]  pl-[12%] pr-[13%] pt-[4rem] pb-[10.2rem] "
            style={{
              backgroundImage: 'url("./images/chessboard-02.png")',
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "100% 100%",
            }}
          >
            <div className="bg-rd-400 h-[100%]   flex-col  ">
              <Board
                boardArray2={boardArray2}
                possibleMoves={possibleMoves}
                tempFn={tempFn}
              ></Board>
            </div>
          </div>
        </div>

        <div className="my-6  h-[60px] basis-1/2 right-bar">
          {/* DIFFICULTY LEVEL */}
          <div
            className="flex flex-col justify-center items-start h-[40vh]"
            style={{
              background:
                'transparent url("./images/difficulty-level.png") no-repeat center center',
              backgroundSize: "cover",
            }}
          >
            <label className="control control-radio">
              Easy
              <input
                onChange={() => setDifficulty(0)}
                type="radio"
                name="radio"
              />
              <div className="control_indicator"></div>
            </label>
            <label className="control control-radio">
              Medium
              <input
                onChange={() => setDifficulty(1)}
                type="radio"
                name="radio"
              />
              <div className="control_indicator"></div>
            </label>
            <label className="control control-radio">
              Hard
              <input
                onChange={() => setDifficulty(2)}
                type="radio"
                name="radio"
              />
              <div className="control_indicator"></div>
            </label>
          </div>

          {/* MOVES PLAYED */}
          <div
            className="flex flex-col justify-center items-start h-[40vh] px-[90px] font-semibold text-lg text-white"
            style={{
              background:
                'transparent url("./images/difficulty-level.png") no-repeat center center',
              backgroundSize: "cover",
            }}
          >
            {history}
          </div>
        </div>
      </div>
    </div>
  );
}

const Board = ({ boardArray2, tempFn, possibleMoves }) => {
  let x = [8, 7, 6, 5, 4, 3, 2, 1];
  let y = ["A", "B", "C", "D", "E", "F", "G", "H"];
  console.log("board arr", boardArray2);
  var X = x.map((p) => {
    var Y = y.map((s) => {
      var str = "b";
      if (boardArray2[s + p]?.toUpperCase() === boardArray2[s + p]) {
        str = "w";
      }
      return (
        <div
          key={s}
          draggable={false}
          className={
            "flex-auto select-none relative z-20  m-[1px] " +
            (possibleMoves.includes(s + p) && "bg-[#6f69]")
          }
          onClick={() => tempFn(s + p, boardArray2[s + p])}
        >
          {boardArray2[s + p] !== " " && (
            <img
              key={s + p}
              draggable={false}
              src={"./images/new_images/" + str + boardArray2[s + p] + ".png"}
              className="z-10 select-none top-[-1rem] absolute drag pointer-events-none "
              alt=""
            />
          )}
        </div>
      );
    });
    return (
      <div key={p} className="flex h-[12.5%] relative flex-auto w-full ">
        {Y}
      </div>
    );
  });
  return <>{X}</>;
};

export default App;