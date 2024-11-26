import { TrackItem } from './songs';

export interface Artists {
  href: string;
  items: ArtistItem[];
}

export interface ArtistItem {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string | null;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: ArtistImage[];
  name: string;
  popularity: number;
  type: 'artist';
  uri: string;
  tracks: TrackItem[];
}

interface ArtistImage {
  height: number;
  width: number;
  url: string;
}
