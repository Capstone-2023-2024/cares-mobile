import type {
  ClassSectionProps,
  CurrentUserRoleType,
  ReadAdviserInfoProps,
  StudentInfoProps,
} from '@cares/common/types/user';
import type {ReactNode} from 'react';

interface YearLevelSectionProps {
  yearLevel: string;
  section: StudentInfoProps['section'];
}
interface UniversalProviderStateProps {
  role?: CurrentUserRoleType;
  currentSelectedActivityId: string;
  queryId: string | null;
  mayorInfo?: StudentInfoProps;
  adviserInfo?: ReadAdviserInfoProps;
  studentsInfo?: StudentInfoProps[];
  currentStudentInfo?: StudentInfoProps;
  calendar: {
    month: number;
    year: number;
  };
}

interface UniversalContextProps extends UniversalProviderStateProps {
  setRole: (value: UniversalProviderStateProps['role']) => void;
  setCurrentSelectedActivityId: (value: string) => void;
  setMayorInfo: (value: StudentInfoProps) => void;
  setCalendar: (value: UniversalProviderStateProps['calendar']) => void;
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
