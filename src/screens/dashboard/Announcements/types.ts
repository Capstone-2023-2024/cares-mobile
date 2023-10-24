import type {AnnouncementProps} from '~/types/announcement';

export interface ContainerProps extends Omit<AnnouncementProps, 'id'> {
  single?: boolean;
}
