import { useState } from "react";

export const usePurchaseModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const openModal = (pokemon) => {
    setSelectedPokemon(pokemon);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedPokemon(null);
  };

  return {
    isOpen,
    selectedPokemon,
    openModal,
    closeModal,
  };
};
