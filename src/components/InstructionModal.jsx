import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import "../App.css";

const dropIn = {
  hidden: {
    x: "100vw",
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    x: "-100vw",
    opacity: 0,
    transition: {
      duration: 1,
    },
  },
};

const InstructionModal = ({ setStartmodal, handleClose }) => {
  
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        // drag
        onClick={(e) => e.stopPropagation()}
        className="modal p-[100px] flex items-center justify-center z-20"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="flex flex-col items-center justify-center relative top-[4rem]">
          <p className="font-bold text-4xl py-4 text-white">Instructions:</p>

          <p className="font-bold text-2xl pt-4 text-orange-300">
            Lead the troops by abiding the Chess Rules
          </p>
          <p className="font-bold text-2xl py-5 text-orange-300 hover:scale-105 hover:font-black animate-bounce">
            {/* Please lead us to retain our territory back */}Good Luck!!
          </p>

          <motion.button
            onClick={() => {
              setStartmodal(0);
            }}
            className="relative top-[5rem]"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <img src={"./images/5-02.png"} alt="tag" width={180} height={170} />
            <p className="z-21 relative bottom-[3.6rem] font-black text-[26px]">
              Let's go
            </p>
          </motion.button>
        </div>

        <div className="z-22 absolute right-[670px] top-[250px] h-[200px] w-[290px]">
          <img src={"./images/characters/Hand-Cannon.png"} alt="tag" />
        </div>
      </motion.div>
    </Backdrop>
  );
};

export default InstructionModal;
