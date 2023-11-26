import type {ComplaintProps} from '@cares/types/complaint';
import type {CurrentUserRoleType} from '@cares/types/user';
import {recipientEscalation} from '@cares/utils/validation';
import {firebase} from '@react-native-firebase/firestore';
import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import {Alert} from 'react-native';
import type {DocumentPickerResponse} from 'react-native-document-picker';
import {collectionRef} from '~/utils/firebase';
import {useComplaints} from './ComplaintsProvider';
import {useUniversal} from './UniversalProvider';

export interface ContentManipulationProviderStateProps {
  message: string;
  files: DocumentPickerResponse[];
  newConcernDetails?: Omit<ComplaintProps, 'messages'>;
  turnOverMessage: string | null;
  selectedChatId: string | null;
  selectedStudent: string | null;
  selectedChatHead: 'class_section' | 'students' | CurrentUserRoleType | null;
}
const contentManupulationInitState: ContentManipulationProviderStateProps = {
  message: '',
  files: [],
  turnOverMessage: '',
  selectedChatId: null,
  selectedStudent: null,
  selectedChatHead: null,
};
interface ContentManipulationContextProps
  extends ContentManipulationProviderStateProps {
  setTurnOverMessage: (value: string | null) => void;
  setSelectedChatId: (value: string | null) => void;
  setSelectedStudent: (value: string | null) => void;
  setSelectedChatHead: (
    value: ContentManipulationProviderStateProps['selectedChatHead'],
  ) => void;
  setMessage: (value: string) => void;
  setFiles: (value: DocumentPickerResponse[]) => void;
  setNewComplaints: (
    value: (typeof contentManupulationInitState)['newConcernDetails'],
  ) => void;
  actionButton: (status: StatusType) => Promise<void>;
}
interface ContentManipulationProviderProps {
  children: ReactNode;
}
type StatusType = 'resolved' | 'turn-over';
const ContentManipulationContext =
  createContext<ContentManipulationContextProps>({
    ...contentManupulationInitState,
    setTurnOverMessage: () => null,
    setSelectedChatId: () => null,
    setSelectedStudent: () => null,
    setSelectedChatHead: () => null,
    setMessage: () => null,
    setFiles: () => null,
    setNewComplaints: () => null,
    actionButton: async () => {
      const promise = new Promise(function (
        resolve: (props: void) => void,
        reject: (props: void) => void,
      ) {
        resolve;
        reject;
      });
      return promise;
    },
  });

const ContentManipulationProvider = ({
  children,
}: ContentManipulationProviderProps) => {
  const [state, setState] = useState(contentManupulationInitState);
  const {currentStudentComplaints} = useComplaints();
  const {role, currentStudentInfo, queryId} = useUniversal();

  const setMessage = useCallback((value: string) => {
    setState(prevState => ({
      ...prevState,
      message: value,
    }));
  }, []);
  const setFiles = useCallback((value: DocumentPickerResponse[]) => {
    setState(prevState => ({
      ...prevState,
      files: value,
    }));
  }, []);
  const setNewComplaints = useCallback(
    (value: (typeof contentManupulationInitState)['newConcernDetails']) => {
      setState(prevState => ({
        ...prevState,
        newConcernDetails: value,
      }));
    },
    [],
  );
  const setTurnOverMessage = useCallback(
    (turnOverMessage: string | null) =>
      setState(prevState => ({...prevState, turnOverMessage})),
    [],
  );
  const setSelectedChatId = useCallback(
    (selectedChatId: string | null) =>
      setState(prevState => ({...prevState, selectedChatId})),
    [],
  );
  const setSelectedStudent = useCallback(
    (selectedStudent: string | null) =>
      setState(prevState => ({...prevState, selectedStudent})),
    [],
  );
  const setSelectedChatHead = useCallback(
    (
      selectedChatHead: ContentManipulationProviderStateProps['selectedChatHead'],
    ) => setState(prevState => ({...prevState, selectedChatHead})),
    [],
  );
  async function actionButton(type: StatusType) {
    console.log(queryId);
    try {
      if (typeof state.selectedChatId === 'string') {
        if (queryId !== null) {
          const individualColRef = collectionRef('complaints')
            .doc(queryId)
            .collection('individual');

          const targetDoc = individualColRef.doc(state.selectedChatId);
          if (type === 'resolved') {
            await targetDoc.update({status: type});
          } else if (type === 'turn-over') {
            if (role !== undefined) {
              const turnOverDetails = {
                dateCreated: new Date().getTime(),
                referenceId: state.selectedChatId,
                messages: [
                  {
                    sender: currentStudentInfo?.studentNo ?? role,
                    message: state.turnOverMessage,
                    timestamp: new Date().getTime(),
                  },
                ],
                recipient: recipientEscalation(role),
                status: 'processing',
                studentNo:
                  currentStudentComplaints?.filter(
                    props => state.selectedChatId === props.id,
                  )[0]?.studentNo ?? 'null',
              };

              await targetDoc.update({
                status: type,
                turnOvers: firebase.firestore.FieldValue.increment(1),
              });
              await individualColRef.add(turnOverDetails);
            }
          }
        }
      }
    } catch (err) {
      Alert.alert('error', 'Action Button');
    }
  }

  return (
    <ContentManipulationContext.Provider
      value={{
        ...state,
        setMessage,
        setFiles,
        setNewComplaints,
        setTurnOverMessage,
        setSelectedChatId,
        setSelectedStudent,
        setSelectedChatHead,
        actionButton,
      }}>
      {children}
    </ContentManipulationContext.Provider>
  );
};

/** Collection of changable data inside Complaints */
export const useContentManipulation = () =>
  useContext(ContentManipulationContext);
export default ContentManipulationProvider;
