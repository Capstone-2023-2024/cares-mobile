import type {StudentCORProps} from 'mobile/../../shared/types/student';
import type {UserCacheType} from '~/screens/authentication/Register/types';

export interface StudentInfoProps {
  id: string;
  data: () => Omit<StudentCORProps, 'studentNo'>;
}

export interface PushToCacheProps {
  usersCache: UserCacheType[];
}
