import type {ReactNode} from 'react';

interface ModalProviderStateProps {
  showStudents: boolean;
  showMayorModal: boolean;
  showTurnOverPopUp: boolean;
  showTurnOverModal: boolean;
}
interface ModalContextProps extends ModalProviderStateProps {
  setShowStudents: (value: boolean) => void;
  setShowMayorModal: (value: boolean) => void;
  setShowTurnOverPopUp: (value: boolean) => void;
  setShowTurnOverModal: (value: boolean) => void;
}
interface ModalProviderProps {
  children: ReactNode;
}

export type {ModalProviderStateProps, ModalContextProps, ModalProviderProps};
