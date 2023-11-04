import type {DateFileProps, FirestoreDatabaseProps} from './firebase';
import type {PhotoMediaProps} from './media';

export interface AnnouncementProps
  extends DateFileProps,
    FirestoreDatabaseProps,
    PhotoMediaProps {
  type: 'recognition' | 'university_memorandum' | 'event';
  message: string;
  postedBy: string;
  department: 'cite';
  state: 'unpinned' | 'pinned';
  markedDates: string[];
}
