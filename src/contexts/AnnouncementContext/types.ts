import type {ReactNode} from 'react';
import type {AnnouncementProps} from '~/types/announcement';

export interface AnnouncementStateProps
  extends Pick<AnnouncementProps, 'type'> {
  tag: string;
  orderBy: 'asc' | 'desc';
  data: AnnouncementProps[];
}
export interface AnnouncementContextProps extends AnnouncementStateProps {
  handleTypeChange: (value: AnnouncementStateProps['type']) => void;
  handleOrderBy: (value: AnnouncementStateProps['orderBy']) => void;
  handleTag: (value: AnnouncementStateProps['tag']) => void;
}
export interface AnnouncementProviderProps {
  children: ReactNode;
}
