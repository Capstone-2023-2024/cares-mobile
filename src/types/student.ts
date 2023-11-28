import type {StudentInfoProps} from '@cares/types/user';

interface StudentCORProps
  extends Omit<
    StudentInfoProps,
    'email' | 'src' | 'section' | 'dateCreated' | 'dateEdited'
  > {}

export type {StudentCORProps};
