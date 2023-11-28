import React, {createContext, useContext, useState} from 'react';
import type {
  ModalContextProps,
  ModalProviderProps,
  ModalProviderStateProps,
} from './types';

const modalInitState: ModalProviderStateProps = {
  showStudents: false,
  showMayorModal: false,
  showTurnOverPopUp: false,
  showTurnOverModal: false,
};

const ModalContext = createContext<ModalContextProps>({
  ...modalInitState,
  setShowStudents: () => null,
  setShowMayorModal: () => null,
  setShowTurnOverPopUp: () => null,
  setShowTurnOverModal: () => null,
});

const ModalProvider = ({children}: ModalProviderProps) => {
  const [state, setState] = useState(modalInitState);
  // console.log({ modals: state });
  function handleState(key: keyof ModalProviderStateProps, value: boolean) {
    setState(prevState => ({...prevState, [key]: value}));
  }

  function setShowStudents(value: boolean) {
    handleState('showStudents', value);
  }
  function setShowMayorModal(value: boolean) {
    handleState('showMayorModal', value);
  }
  function setShowTurnOverPopUp(value: boolean) {
    handleState('showTurnOverPopUp', value);
  }
  function setShowTurnOverModal(value: boolean) {
    handleState('showTurnOverModal', value);
  }

  return (
    <ModalContext.Provider
      value={{
        ...state,
        setShowStudents,
        setShowMayorModal,
        setShowTurnOverPopUp,
        setShowTurnOverModal,
      }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
export default ModalProvider;
