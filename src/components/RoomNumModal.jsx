import { useState } from "react";
import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import { useNavigate } from "react-router-dom";
import "../App.css";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const RoomNumModal = ({ handleClose, openP, closeP, setRoomno }) => {
  const navigate = useNavigate();

  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="modal p-[100px] flex items-center justify-center z-20"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="flex flex-col items-center justify-center relative top-[4rem]">
          <p className="font-bold text-4xl py-4 text-white">
            Enter the Room Number:
          </p>

          <input
            type="text"
            className="m-3 p-2 w-[300px] h-[40px] rounded-md border-2 border-black hover:scale-105 hover:duration-300"
            onChange={(e) => setRoomno(e.target.value)}
          />

          <motion.button
            onClick={() => {
              handleClose();
              navigate("/multiplayer");
            }}
            className="relative top-[5rem]"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <img src={"./images/5-02.png"} alt="tag" width={180} height={170} />
            <p className="z-21 relative bottom-[3.6rem] font-black text-[26px]">
              Battle
            </p>
          </motion.button>
        </div>

        <div className="z-22 absolute right-[650px] top-[200px] h-[350px] w-[400px]">
          <img src={"./images/characters/TNT-Holder.png"} alt="tag" />
        </div>
      </motion.div>
    </Backdrop>
  );
};

export default RoomNumModal;
