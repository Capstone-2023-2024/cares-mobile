import type {ReactNode} from 'react';
import type {
  AnnouncementProps,
  ReadAnnouncementProps,
} from '@cares/common/types/announcement';

export interface AnnouncementStateProps
  extends Pick<AnnouncementProps, 'type' | 'title'> {
  data: ReadAnnouncementProps[];
}
export interface AnnouncementContextProps extends AnnouncementStateProps {
  handleTypeChange: (value: string) => void;
  handleTitle: (value: AnnouncementStateProps['title']) => void;
}
export interface AnnouncementProviderProps {
  children: ReactNode;
}
