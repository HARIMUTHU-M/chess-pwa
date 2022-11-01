import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DifficultyModal from "./DifficultyModal";
import PlayTypeModal from "./PlayTypeModal";
import RoomNumModal from "./RoomNumModal";
import { useNavigate } from "react-router-dom";

const Home = ({ setDifficulty, setRoomno }) => {

  const navigate = useNavigate()


  const [openDiffModal, setOpenDiffModal] = useState(false);
  const openD = () => setOpenDiffModal(true);
  const closeD = () => setOpenDiffModal(false);

  const [openPlayType, setOpenPlayType] = useState(false);
  const openP = () => setOpenPlayType(true);
  const closeP = () => setOpenPlayType(false);

  const [openRoomModal, setOpenRoomModal] = useState(false);
  const openR = () => setOpenRoomModal(true);
  const closeR = () => {
    setOpenRoomModal(false);
    // console.log(roomno);
    navigate("/")
  };

  return (
    <div
      className="h-screen bg-cover bg-center flex justify-center items-center"
      style={{
        backgroundImage: "url('./images/peakpx-2.jpg')",
      }}
    >
      <motion.button
        // drag
        onClick={() => {
          openPlayType ? closeP() : openP();
        }}
        className="relative top-[25%]"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <img src={"./images/2-02.png"} alt="tag" />
        <p className="z-10 relative bottom-[5.6rem] font-black text-[30px]">
          New Game
        </p>
      </motion.button>

      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {openPlayType && (
          <PlayTypeModal
            handleClose={closeP}
            openD={openD}
            closeD={closeD}
            openR={openR}
          />
        )}

        {openDiffModal && (
          <DifficultyModal handleClose={closeD} setDifficulty={setDifficulty} />
        )}

        {openRoomModal && (
          <RoomNumModal
            handleClose={closeR}
            setRoomno={setRoomno}
            closeP={closeP}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
