
export interface EmailInfo {
  emailId: string,
  sender: { address: string, name: string};
  subject: string;
  timestamp: string;
  isSelected: boolean;
  isRead: boolean;
}
