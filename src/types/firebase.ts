import {Role} from '~/screens/authentication/Landing/types';

export interface FirestoreDatabaseProps {
  id: string;
}

export interface DateFileProps {
  dateCreated: number;
  dateEdited: number | null;
}

export type CollectionPath =
  | 'about'
  | 'announcement'
  | 'chat'
  | 'concerns'
  | 'permission'
  | 'project_suggestion'
  | Role;
