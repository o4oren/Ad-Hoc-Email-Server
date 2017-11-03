
export interface EmailInfo {
  emailId: string
  sender: { address: string, name: string};
  subject: string;
  timestamp: number;
  isSelected: boolean;
  isRead: boolean;
}
