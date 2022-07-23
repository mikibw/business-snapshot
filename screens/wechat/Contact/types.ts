export type ContactListItem = {
  id: number;
  avatar: any;
  name: string;
  selected?: boolean;
};

export type ContactListSectionData = {
  key: string;
  data: ContactListItem[];
};

export type UserRequestListItem = {
  id: number;
  avatar: any;
  name: string;
  message: string;
  isAdded: boolean;
};
