export interface AppNotification {
  id: string;
  title: string;
  desc: string;
  time: string;
  read: boolean;
  type: 'order' | 'alert' | 'system';
}

export interface UserProfile {
  name: string;
  role: string;
  avatar: string;
}