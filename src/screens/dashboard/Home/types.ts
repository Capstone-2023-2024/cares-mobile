import type {StudInfoSortedType} from 'shared/types';
import type {UserCacheType} from '~/screens/authentication/Register/types';

export interface StudentInfoProps {
  id: string;
  data: () => Omit<StudInfoSortedType, 'studentNo'>;
}

export interface PushToCacheProps {
  usersCache: UserCacheType[];
}
