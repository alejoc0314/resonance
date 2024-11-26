import { TrackItem } from './songs';

export interface Albums {
  href: string;
  items: AlbumItem[];
}

export interface AlbumItem {
  album_type: 'single' | 'album';
  album: { images: AlbumImage[] };
  artists: Artist[];
  available_markets: string[];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: AlbumImage[];
  name: string;
  release_date: string;
  release_date_precision: 'day' | 'month' | 'year';
  total_tracks: number;
  type: 'album' | 'single';
  uri: string;
  tracks: {
    items: TrackItem[];
  };
}

interface Artist {
  name: string;
  id: string;
}

interface AlbumImage {
  height: number;
  width: number;
  url: string;
}
