import type {
  ReadClassSectionProps,
  ReadComplaintProps,
} from '@cares/types/complaint';
import type {ReactNode} from 'react';

interface ComplaintsProviderStateProps {
  otherComplaints: ReadComplaintProps[];
  classSectionComplaints: ReadClassSectionProps[];
  currentStudentComplaints: ReadComplaintProps[];
}
interface ComplaintsContextProps extends ComplaintsProviderStateProps {
  setOtherComplaints: (
    array: ComplaintsProviderStateProps['otherComplaints'],
  ) => void;
  setClassSectionComplaints: (
    array: ComplaintsProviderStateProps['classSectionComplaints'],
  ) => void;
  setCurrentStudentComplaints: (
    array: ComplaintsProviderStateProps['currentStudentComplaints'],
  ) => void;
}
interface ComplaintsProviderProps {
  children: ReactNode;
}

export type {
  ComplaintsProviderStateProps,
  ComplaintsContextProps,
  ComplaintsProviderProps,
};
