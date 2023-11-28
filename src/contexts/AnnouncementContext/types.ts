import type {ReactNode} from 'react';
import type {
  AnnouncementProps,
  ReadAnnouncementProps,
} from '@cares/types/announcement';

export interface AnnouncementStateProps
  extends Pick<AnnouncementProps, 'type' | 'title'> {
  data: ReadAnnouncementProps[];
}
export interface AnnouncementContextProps extends AnnouncementStateProps {
  handleTypeChange: (value: string) => void;
  handleTag: (value: AnnouncementStateProps['title']) => void;
}
export interface AnnouncementProviderProps {
  children: ReactNode;
}
