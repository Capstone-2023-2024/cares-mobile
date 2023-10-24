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
  | 'faculty'
  | 'mayor'
  | 'project_suggestion'
  | 'student';
