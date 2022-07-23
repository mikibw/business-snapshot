export type DiscoveryListItem = {
  icon: any;
  name: string;
  badge?: any;
  node?: any;
};

export type DiscoveryListSectionData = {
  key: string;
  data: DiscoveryListItem[];
};
