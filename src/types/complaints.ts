export interface DocumentProps {
  files: string[];
}

export interface ConcernProps extends Partial<DocumentProps> {
  id: string;
  message: string;
  withDocument: boolean;
  sender: string;
  dateCreated: number;
}

export interface ChatTextProps {
  text: string;
  condition: boolean;
  textSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}
