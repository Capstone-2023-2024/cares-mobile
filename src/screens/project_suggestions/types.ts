interface OptionProps {
  name: string;
  value: number;
}

export interface EventProps {
  type: 'poll';
  state: 'unpublished' | 'published';
  question: string;
  options: OptionProps[];
  votes?: {[x: string]: string};
  dateCreated: number;
  dateOfExpiration: number;
}

export interface EventWithIdProps extends EventProps {
  id: string;
}

export interface PollStyledTextProps {
  condition: boolean;
  value: string;
}

export interface PollStateProps {
  idea: string | null;
}
export type PollStateValue = PollStateProps['idea'];
