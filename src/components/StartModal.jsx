import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
// import { useNavigate } from "react-router-dom";
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
      delay: 1,
      duration: 1,
    },
  },
};

const StartModal = ({ setStartmodal, handleClose }) => {
  //   const navigate = useNavigate();

  return (
    // <AnimatePresence>
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
          <p className="font-bold text-4xl py-4 text-white">Hey Chief!!</p>

          <p className="font-bold text-2xl pt-4 text-orange-300">
            We are loosing our territory !!
          </p>
          <p className="font-bold text-2xl pb-4 text-orange-300">
            Lead us to retain our territory back
          </p>

          <motion.button
            onClick={() => {
              setStartmodal(2);
            }}
            className="relative top-[5rem]"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <img src={"./images/5-02.png"} alt="tag" width={180} height={170} />
            <p className="z-21 relative bottom-[3.6rem] font-black text-[26px]">
              Next
            </p>
          </motion.button>
        </div>

        <div className="z-22 absolute right-[1150px] top-[400px] h-[200px] w-[400px]">
          <img src={"./images/characters/Pawn.png"} alt="tag" />
        </div>
      </motion.div>
    </Backdrop>
    // </AnimatePresence>
  );
};

export default StartModal;
