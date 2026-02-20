export interface StoreSettings {
  name: string;
  owner: string;
  phone: string;
  address: string;
  email: string;
  isOpen: boolean;
  logo: string | null;
}

export interface NotificationToggles {
  orderAlerts: boolean;
  stockAlerts: boolean;
  whatsappUpdates: boolean;
}

export interface SettingsData {
  store: StoreSettings;
  toggles: NotificationToggles;
}