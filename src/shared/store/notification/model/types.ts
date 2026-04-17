export type TNotification = {
  id: string;
  type?: "success" | "error" | "warning";
  title: string;
  desc?: string;
  duration?: number;
  createdAt: Date;
};

export type TNotificationStore = {
  data: TNotification[];
  add: (data: Omit<TNotification, "id" | "createdAt">) => void;
  remove: (id: TNotification["id"]) => void;
  clear: () => void;
  clearByType: (type: TNotification["type"]) => void;
};
