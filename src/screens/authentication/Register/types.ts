import type {StudInfoSortedType} from 'mobile/../../shared/types';

export interface FileType {
  uri: string;
  name: string | null;
  size: number | null;
}

type CORNameType =
  | 'studentNo'
  | 'college'
  | 'schoolYear'
  | 'name'
  | 'course'
  | 'gender'
  | 'major'
  | 'curriculum'
  | 'age'
  | 'yearLevel'
  | 'scholarship';

export interface CORPatternsProps {
  name: CORNameType;
  regex: RegExp;
}

export type UserCacheType = {
  [x: string]: Omit<StudInfoSortedType, 'studentNo'>;
};
