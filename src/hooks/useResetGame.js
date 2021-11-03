import { useState } from "react";
import { useDispatch } from "react-redux";

import * as GameActions from "../store/game/game";

export const useResetGame = () => {
  const dispatch = useDispatch();

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const onResetModalClose = () => setIsConfirmModalOpen(false);
  const openResetModal = () => setIsConfirmModalOpen(true);
  const confirmResetGame = () => {
    dispatch(GameActions.RESET_GAME());
    onResetModalClose();
  };

  return [
    isConfirmModalOpen,
    onResetModalClose,
    openResetModal,
    confirmResetGame,
  ];
};
