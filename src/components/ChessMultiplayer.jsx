import { useState, useEffect, useCallback } from "react";
import { Game } from "js-chess-engine";
import "../App.css";
import { motion, AnimatePresence } from "framer-motion";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

import WinModal from "./WinModal";
import LoseModal from "./LoseModal";
// const game1 = new Game();

const socket = io("https://chess-backend.onrender.com/");

function ChessMultiplayer({ roomno }) {
  const [game, setGame] = useState(new Game());

  const [boardArray2, setBoardArray2] = useState({});

  const [counter, setCounter] = useState(0);
  const [counter2, setCounter2] = useState(0);
  const [player, setPlayer] = useState("");

  const [white, setWhite] = useState("");
  const [black, setBlack] = useState("");
  // const [history, setHistory] = useState("");

  const soundEn = 'UklGRnwFAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YYgEAAANAG4A5AAmAO4ANAHfAM0AsACXAOMAQwEDAVUAzwC8AP0A0gClAPwA/QBxAFsAXADEAC4BtQDrAC4BNgEbAhUEfQjzEMQcQSzAOrpEOEeNPXYdmerdxeG0uqearpSzbLRfvMjRZPUpJrNTF3Izbw9dsDnNFxjy3doAzTrQU9IW12HTpdhu30brKPVm/+QMWBjJHh0bZBQADoYGRvy+9ATvROs76Lvgitcg08DV49+u8xwLoyD+Lm0xaC1VI30ZsRQeDcj/oO7B2A7IM776vv3Kp+BL9d4LNBoPIzAmNy61Mjc2RzawMgQnrxiQCDf37Omb4ararNZW1zPbu+Ii7Mr4AgcpFt0j0i0mMEUqNB2oDHH9Tu2X4rnYHtKizCvM09K23p7wWQVRGDIlEyiHJd0dYRAoB74At/q294/10/E38BLvCfCm9C79MAX0C2QPmRCKD8kObwxuCNYD3v1g+LryKuzF5+jlFObN6ATwA/et/i4FmAi0DE0PZBEPEi4SUg9tCpIELv+b+db08/EW8avxSvKz8lTzh/Rs9uT4Ovud/ab/igDPARICXgJCAocBYQG6AL//Sf+//2cBhQNoBpwJkAw3DtEO9Q2HDL4J/QR7/3v6UPUg8A3tcOr+6T/rHu7A8mv5pv8uBpwKlgzTDaINBAzMCXAGhAKo/9v8qvo8+f74K/mr+f/5Kvr/+c75GPk3+Lr3i/cL+OX4P/p5+139wv/9AUUEOQbRB3YIFQjxBtYFiQR7A2ICAAH+/s78PPp49wH10fIP8eTvOu9d77TwVfLQ9A33evnt+3D+rgE4BHoFbAYUBhwGPgXCBFQD3wAj/1z9DPyc+yX8Bv5D/xYA8f+n/nr9E/zt+gj6w/nf+fP5hfo6+7/86v5wAbEDqAWMBuYGPQczB8IGIgYFBSQDbQFPAKP/gP6f/Y79Of38/Qr/RAAoAUECAgPqAgcD+QJ+A/wCigL7AToB8QC7AFsBRwLlAiQD9QLRApsCOQLlAfgAGwD7/iP+xv2n/ev9y/6S/vr9Q/1w/Hf8p/xQ/Mr8Pf3q/T3/IAFAAzYEGQTyA9oDbwO0AqoBrQBD/6f9evy3++L6AftO+9j79/t9+7/63/m8+LL3HPfu9uX2U/fC9xz5LPsg/cH+BwAxAf0BGgI7An8CRAKxAqMCGQJaAY8Ae/9T/nX9SPxC+5f6JPrp+av5afm7+RT6WPoS+7z7nPyI/aL+yf+zAJEBgwJVA9YD+wOTA1sDqQJoAqQB+QCFAOH/Fv/3/Rb9avzs+/L7Gvxf/J/8jPx8/Jz8C/1F/eb9zf51/2kAcgEZAmMCowJyAhkCygEsAVUAj//i/mP+x/1u/XH9wf00/oD+Pf7G/c/97f0L/lT+nP70/uH+nf65/h3/uv/k/7X/Zf8F/1P++P2k/TH9wvxL/Mf7Yftb+4n77vsy/D78rPxD/Xf90/1l/qP+GP9m//L/sgAoAUUBZgG2AZIB0QE3AqUC1wLFAtcCmwL5Ad0B1AGAAd4BDwI3Am0CnAKsAmkC4AFaAYsAFQBi/2j/IP+8/kxJU1RUAAAASU5GT0lOQU0YAAAAY2hlc3NfbW92ZV9vbl9hbGFiYXN0ZXIASUFSVAYAAABtaDJvAABJQ1JEBgAAADIwMTYAAElHTlIMAAAAU291bmQgQ2xpcAAAaWQzIGwAAABJRDMEAEAAAABhAAAADAEgBQsuT0NfVENPTgAAAAsAAABTb3VuZCBDbGlwVElUMgAAABgAAABjaGVzc19tb3ZlX29uX2FsYWJhc3RlclREUkMAAAAFAAAAMjAxNlRQRTEAAAAFAAAAbWgybwA='
  const moveSound = new Audio(`data:audio/wav;base64,${soundEn}`)

  const [isFinished, setIsFinished] = useState(false);
  const [checkmate, setCheckmate] = useState(false);
  const [currTurn, setCurrTurn] = useState("white");

  const [modalOpen, setModalOpen] = useState(false);
  // const open = () => setModalOpen(true);
  const close = () => setModalOpen(false);
  const navigate = useNavigate ();

  const sendMessage = async () => {
    if (player!=="") {
      const currBoardArray = boardArray2;
      console.log("Send message array");
      console.log(currBoardArray);
      const data = {
        room: roomno,
        game: await game,
        boardArray2: currBoardArray,
        white: white,
        black: black,
        isFinished: isFinished,
        currTurn: currTurn,
      };
      socket.emit("send_message", data);
    }
  };

  const joinRoom = () => {
    if (roomno !== "") {
      socket.emit("join_room", roomno);
    }
  };

  const forceUpdate = useCallback(
    (boardArray) => setBoardArray2({ ...boardArray }),
    []
  );

  // let keys = Object.keys(boardArray2);
  let board = game.exportJson().pieces;

  async function setCurrBoard() {
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
      board = await game.exportJson().pieces;
      // console.log(board)
      for (let j = 1; j <= 8; j++) {
        let piece = board[xaxis[i] + yaxis[j]];
        if (piece) {
          boardArray[xaxis[i] + yaxis[j]] = piece;
        } else {
          boardArray[xaxis[i] + yaxis[j]] = " ";
        }
      }
    }
    forceUpdate(boardArray);
  }

  const getLastMove = () => {
    const A = game.getHistory();
    const B = game.exportJson();
    console.log(B);
    if (A[A.length - 1].configuration.turn === "black")
      setWhite(white + "\t" + A[A.length - 1].from + "-" + A[A.length - 1].to);
    else
      setBlack(black + "\t" + A[A.length - 1].from + "-" + A[A.length - 1].to);

    setIsFinished(B.isFinished);
    setCheckmate(B.checkMate);
    setCurrTurn(B.turn);
    if (B.checkMate) {
      setBlack("");
      setWhite("");
      setGame(new Game());
    }
  };

  const [possibleMoves, setPossibleMoves] = useState([]);
  const [fromPosition, setfromPosition] = useState("");

  const tempFn = async (x, y) => {
    console.log("Player is " + game.board.configuration.turn);
    if (player === game.board.configuration.turn) {
      if (possibleMoves.length > 0 && possibleMoves.includes(x)) {
        game.move(fromPosition, x);
        boardArray2[x] = boardArray2[fromPosition];
        boardArray2[fromPosition] = " ";

        // await setCurrBoard();
        await getLastMove();
        setfromPosition("");
        setPossibleMoves([...[]]);
      } else if (possibleMoves.length > 0) {
        setPossibleMoves([...[]]);
      } else {
        setPossibleMoves([...game.moves(x)]);
        setfromPosition(x);
      }
      setCounter(counter + 1);
      // setCounter2(counter2 + 1);
      // await setCurrBoard();
    }
  };

  useEffect(() => {
    if(roomno==="" || roomno==null) navigate("/"); 
    else joinRoom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function temp() {
      await setCurrBoard();
    }
    temp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter2]);

  useEffect(() => {
    async function temp() {
      await setCurrBoard();
      await sendMessage();
    }
    temp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter]);

  useEffect(()=>{
    if(player!=="")
    moveSound.play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[currTurn])

  useEffect(() => {
    socket.on("receive_board", async (data) => {
      // await moveSound.play();
      setGame(await new Game(data.game.board.configuration));
      setBoardArray2(await data.boardArray2);
      setWhite(await data.white);
      setBlack(await data.black);
      setCurrTurn(await data.currTurn);
      setIsFinished(await data.isFinished);
      setCounter2(counter2 + 1);
    });

    socket.on("player", async (data) => {
      setPlayer(data.player);
      console.log(data.player);
    });

    socket.on("room_full", async (data) => {
      console.log("Room full");
      navigate('/');
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

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
        <div className="basis-1/2 w-fit px-20   -z-0 ">
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
              />
            </div>
          </div>
        </div>
        <div className="my-6  h-[60px] basis-1/2 right-bar">
          <div
            className="h-[40vh] py-[30px] px-[90px] font-semibold text-lg text-white"
            style={{
              background:
                'transparent url("./images/difficulty-level.png") no-repeat center center',
              backgroundSize: "cover",
            }}
          >
            <div className="my-6 h-[140px] grid grid-cols-2 gap-10 overflow-x-hidden">
              <div>
                <h1 className="font-semibold text-amber-300">White Moves:</h1>
                {black}
              </div>
              <div>
                <h1 className="font-semibold text-amber-300">Black Moves:</h1>
                {white}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {/* {startmodal === 1 && <StartModal setStartmodal={setStartmodal} />}
        {startmodal === 2 && <InstructionModal setStartmodal={setStartmodal} />} */}
        {isFinished &&
          (currTurn !== player ? (
            <WinModal modalopen={modalOpen} handleClose={close} />
          ) : (
            <LoseModal modalopen={modalOpen} handleClose={close} />
          ))}
      </AnimatePresence>
    </div>
  );
}

const Board = ({ boardArray2, tempFn, possibleMoves }) => {
  let x = [8, 7, 6, 5, 4, 3, 2, 1];
  let y = ["A", "B", "C", "D", "E", "F", "G", "H"];
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
              alt=""
              key={s + p}
              draggable={false}
              src={"./images/new_images/" + str + boardArray2[s + p] + ".png"}
              className="z-10 select-none top-[-1rem] absolute drag pointer-events-none "
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

export default ChessMultiplayer;
