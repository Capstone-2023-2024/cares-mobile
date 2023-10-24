import type {StudentCORProps} from '~/types/student';
import type {UserCacheType} from '~/screens/authentication/Register/types';

export interface StudentInfoProps {
  id: string;
  data: () => Omit<StudentCORProps, 'studentNo'>;
}

export interface PushToCacheProps {
  usersCache: UserCacheType[];
}
