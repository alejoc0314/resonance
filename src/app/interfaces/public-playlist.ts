import { TrackItem } from './songs';

export interface PlaylistItem {
  href: string;
  id: string;
  name: string;
  images: Array<{
    url: string;
    height: number;
    width: number;
  }>;
  owner: {
    display_name: string;
    id: string;
  };
  tracks: {
    href: string;
    items: TrackItem[];
    total: number;
  };
}
