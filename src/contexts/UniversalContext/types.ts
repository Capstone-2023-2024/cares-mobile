import type {
  ClassSectionProps,
  ReadAdviserInfoProps,
  StudentInfoProps,
} from '@cares/types/user';
import type {ReactNode} from 'react';

interface YearLevelSectionProps {
  yearLevel: string;
  section: StudentInfoProps['section'];
}
interface UniversalProviderStateProps {
  currentSelectedActivityId?: string;
  queryId: string | null;
  mayorInfo?: StudentInfoProps;
  adviserInfo?: ReadAdviserInfoProps;
  studentsInfo?: StudentInfoProps[];
  currentStudentInfo?: StudentInfoProps;
}

interface UniversalContextProps extends UniversalProviderStateProps {
  setCurrentSelectedActivityId: (
    value: UniversalProviderStateProps['currentSelectedActivityId'],
  ) => void;
  setMayorInfo: (value: StudentInfoProps) => void;
  setAdviserInfo: (value: ReadAdviserInfoProps) => void;
  setStudentsInfo: (value: StudentInfoProps[]) => void;
  setCurrentStudentInfo: (value: StudentInfoProps) => void;
  returnComplaintsQuery: (props: ClassSectionProps) => Promise<void>;
}
interface UniversalProviderProps {
  children: ReactNode;
}

export type {
  ReadAdviserInfoProps,
  UniversalContextProps,
  UniversalProviderProps,
  UniversalProviderStateProps,
  YearLevelSectionProps,
};
