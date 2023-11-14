export interface ChatNavProps {
  modalVisible: boolean;
  title: string;
  about: string;
}

export type ChatNavValue =
  | ChatNavProps['modalVisible']
  | ChatNavProps['title']
  | ChatNavProps['about'];

export interface TicketInfoProps {
  id: string;
  title: string;
  about: string;
  dateCreated: number;
  dateUpdated?: number;
  status: 'pending' | 'turnOvered' | 'resolved' | 'rejected';
}
