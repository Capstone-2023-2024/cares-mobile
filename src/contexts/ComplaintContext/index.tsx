import React, {createContext, useCallback, useContext, useState} from 'react';
import {
  ComplaintsContextProps,
  ComplaintsProviderProps,
  ComplaintsProviderStateProps,
} from './types';

const complaintsInitState: ComplaintsProviderStateProps = {
  otherComplaints: [],
  classSectionComplaints: [],
  currentStudentComplaints: [],
};

const ComplaintsContext = createContext<ComplaintsContextProps>({
  ...complaintsInitState,
  setOtherComplaints: () => null,
  setClassSectionComplaints: () => null,
  setCurrentStudentComplaints: () => null,
});

const ComplaintsProvider = ({children}: ComplaintsProviderProps) => {
  const [state, setState] = useState(complaintsInitState);
  const setOtherComplaints = useCallback(
    (otherComplaints: ComplaintsProviderStateProps['otherComplaints']) => {
      setState(prevState => ({...prevState, otherComplaints}));
    },
    [],
  );
  const setClassSectionComplaints = useCallback(
    (
      classSectionComplaints: ComplaintsProviderStateProps['classSectionComplaints'],
    ) => {
      setState(prevState => ({...prevState, classSectionComplaints}));
    },
    [],
  );
  const setCurrentStudentComplaints = useCallback(
    (
      currentStudentComplaints: ComplaintsProviderStateProps['currentStudentComplaints'],
    ) => {
      setState(prevState => ({...prevState, currentStudentComplaints}));
    },
    [],
  );

  return (
    <ComplaintsContext.Provider
      value={{
        ...state,
        setOtherComplaints,
        setClassSectionComplaints,
        setCurrentStudentComplaints,
      }}>
      {children}
    </ComplaintsContext.Provider>
  );
};

/** Collection of complaints */
export const useComplaints = () => useContext(ComplaintsContext);
export default ComplaintsProvider;
