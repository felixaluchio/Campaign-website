export interface EventItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  whatToExpect?: string;
  whoCanAttend?: string;
  category: "Town Hall" | "Women Forum" | "Youth Empowerment" | "Grassroots Outreach" | "Economic Summit" | "Public Forum" | "MOBILIZATION RALLY" | string;
  date: string; // YYYY-MM-DD
  startTime?: string;
  endTime?: string;
  location?: string;
  locationName: string;
  address?: string;
  county?: string;
  constituency?: string; // Sub-county (e.g. Kiambu Town, Ruiru, Thika, etc.)
  ward?: string;
  isFeatured?: boolean;
  registrationRequired?: boolean;
  recapHighlights?: string[];
  videoRecordingUrl?: string;
  mapUrl?: string;
  imageUrl?: string;
  imageUrls?: string[];
  photos?: string[];
  images?: string[];
  createdAt?: any;
}

export interface VideoItem {
  id: string;
  title: string;
  date: string;
  duration?: string;
  category: "Media Interview" | "Town Hall" | "Keynote Speech" | "Grassroots Highlight" | "Women Forum" | "Youth Empowerment" | string;
  thumbnail?: string;
  youtubeId?: string;
  youtubeUrl?: string;
  description: string;
  venueOrPlatform?: string;
  createdAt?: any;
}

export interface PhotoGalleryItem {
  id: string;
  title: string;
  date: string;
  location: string;
  locationName?: string;
  category: string;
  photosCount?: number;
  description: string;
  imageUrl?: string;
  imageUrls?: string[];
  photos?: string[];
  photoNames?: string[];
  createdAt?: any;
}

export const upcomingEvents: EventItem[] = [];
export const pastEvents: EventItem[] = [];
export const campaignVideos: VideoItem[] = [];
