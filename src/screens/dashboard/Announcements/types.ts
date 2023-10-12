import type {AnnouncementProps} from 'mobile/../../shared/types/announcement';

export interface ContainerProps extends Omit<AnnouncementProps, 'id'> {
  single?: boolean;
}
