import type {ComplaintProps} from '@cares/common/types/complaint';
import type {CurrentUserRoleType} from '@cares/common/types/user';
import type {ReactNode} from 'react';
import type {DocumentPickerResponse} from 'react-native-document-picker';

interface ContentManipulationProviderStateProps {
  message: string;
  files: DocumentPickerResponse[];
  newConcernDetails?: Omit<ComplaintProps, 'messages'>;
  turnOverMessage: string;
  selectedChatId: string | null;
  selectedStudent: string | null;
  selectedChatHead: 'class_section' | 'students' | CurrentUserRoleType | null;
}
interface ContentManipulationContextProps
  extends ContentManipulationProviderStateProps {
  setTurnOverMessage: (value: string) => void;
  setSelectedChatId: (value: string | null) => void;
  setSelectedStudent: (value: string | null) => void;
  setSelectedChatHead: (
    value: ContentManipulationProviderStateProps['selectedChatHead'],
  ) => void;
  setMessage: (value: string) => void;
  setFiles: (value: DocumentPickerResponse[]) => void;
  setNewComplaints: (
    value: ContentManipulationProviderStateProps['newConcernDetails'],
  ) => void;
  actionButton: (status: ComplaintProps['status']) => Promise<void>;
}
interface ContentManipulationProviderProps {
  children: ReactNode;
}

export type {
  ContentManipulationContextProps,
  ContentManipulationProviderProps,
  ContentManipulationProviderStateProps,
};
