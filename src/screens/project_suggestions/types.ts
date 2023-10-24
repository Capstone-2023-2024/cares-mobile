interface OptionProps {
  value: string;
}

export interface EventProps {
  type: 'poll';
  question: string;
  options: OptionProps[];
  dateCreated: number;
  votes?: {[x: string]: string};
  id: string;
}

export interface EventWithIdProps extends EventProps {
  id: string;
}

export interface PollStyledTextProps {
  condition: boolean;
  value: string;
}
