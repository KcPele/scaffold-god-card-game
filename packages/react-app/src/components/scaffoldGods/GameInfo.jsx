import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import CustomButton from "./CustomButton";
import { useStateContext } from "../../context/StateContext";
import { alertIcon, gameRules } from "../../assets";
import styles from "../../styles";

const GameInfo = () => {
  const { gameData, setErrorMessage, setShowAlert, tx, writeContracts } = useStateContext();
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const navigate = useNavigate();

  const handleBattleExit = async () => {
    const battleName = gameData.activeBattle.name;

    try {
      // await contract.quitBattle(battleName);
      await tx(writeContracts.ScaffoldGods.quitBattle(battleName));

      setShowAlert({ status: true, type: "info", message: `You're quitting the ${battleName}` });
      return navigate("/create-battle");
    } catch (error) {
      setErrorMessage(error);
      return null;
    }
  };

  return (
    <>
      <div className={styles.gameInfoIconBox}>
        <div className={`${styles.gameInfoIcon} ${styles.flexCenter}`} onClick={() => setToggleSidebar(true)}>
          <img src={alertIcon} alt="info" className={styles.gameInfoIconImg} />
        </div>
      </div>
      {toggleSidebar && (
        <div
          className={`${styles.gameInfoSidebar} ${toggleSidebar ? "translate-x-0" : "translate-x-full"} ${
            styles.glassEffect
          } ${styles.flexBetween} backdrop-blur-3xl`}
        >
          <div className="flex flex-col">
            <div className={styles.gameInfoSidebarCloseBox}>
              <div
                className={`${styles.flexCenter} ${styles.gameInfoSidebarClose}`}
                onClick={() => setToggleSidebar(false)}
              >
                X
              </div>
            </div>

            <h3 className={styles.gameInfoHeading}>Game Rules:</h3>

            <div className="mt-3">
              {gameRules.map((rule, index) => (
                <p key={`game-rule-${index}`} className={styles.gameInfoText}>
                  <span className="font-bold">{index + 1}</span>. {rule}
                </p>
              ))}
            </div>
          </div>

          <div className={`${styles.flexBetween} mt-10 gap-4 w-full`}>
            <CustomButton title="Change Battleground" handleClick={() => navigate("/battleground")} />
            <CustomButton title="Exit Battle" handleClick={() => handleBattleExit()} />
          </div>
        </div>
      )}
    </>
  );
};

export default GameInfo;
