import type {ReactNode} from 'react';
import type {AnnouncementProps} from '~/types/announcement';

export interface AnnouncementStateProps
  extends Pick<AnnouncementProps, 'type'> {
  tag: string;
  data: AnnouncementProps[];
}
export interface AnnouncementContextProps extends AnnouncementStateProps {
  handleTypeChange: (value: string) => void;
  handleTag: (value: AnnouncementStateProps['tag']) => void;
}
export interface AnnouncementProviderProps {
  children: ReactNode;
}
