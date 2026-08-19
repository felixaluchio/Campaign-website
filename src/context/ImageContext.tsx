import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  convertFileToBase64, 
  DEFAULT_HERO_IMAGE, 
  DEFAULT_BIO_PORTRAIT, 
  DEFAULT_HER_STORY_PHOTO, 
  DEFAULT_WHAT_GUIDES_HER_PHOTO,
  DEFAULT_ROOTED_IN_KIAMBU_PHOTO,
  DEFAULT_VISION_PHOTO5,
  DEFAULT_CAMPAIGN_FALLBACK,
  isValidImageSrc 
} from '../utils/imageUtils';

const LOCAL_STORAGE_KEY = 'phyllis_campaign_images_v5';

export const DEFAULT_IMAGES: Record<string, string> = {
  heroPortrait: DEFAULT_HERO_IMAGE,
  meetPhyllisBio: DEFAULT_BIO_PORTRAIT,
  herStoryCardPhoto: DEFAULT_HER_STORY_PHOTO,
  whatGuidesHerPhoto: DEFAULT_WHAT_GUIDES_HER_PHOTO,
  rootedInKiambuPhoto: DEFAULT_ROOTED_IN_KIAMBU_PHOTO,
  visionPhoto5: DEFAULT_VISION_PHOTO5,
};

interface ImageContextType {
  images: Record<string, string>;
  getImage: (key: string, defaultSrc?: string) => string;
  setImage: (key: string, srcOrBase64: string) => void;
  saveUploadedFile: (key: string, file: File) => Promise<string>;
  resetImage: (key: string) => void;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export function ImageProvider({ children }: { children: ReactNode }) {
  const [images, setImages] = useState<Record<string, string>>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...DEFAULT_IMAGES, ...parsed };
      }
    } catch (e) {
      console.warn('Failed to load images from localStorage:', e);
    }
    return DEFAULT_IMAGES;
  });

  // Sync to localStorage whenever images map changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(images));
    } catch (e) {
      console.warn('Failed to save images to localStorage (quota exceeded?):', e);
    }
  }, [images]);

  const getImage = (key: string, defaultSrc?: string): string => {
    const val = images[key];
    if (isValidImageSrc(val)) {
      return val;
    }
    if (isValidImageSrc(defaultSrc)) {
      return defaultSrc!;
    }
    return DEFAULT_IMAGES[key] || DEFAULT_CAMPAIGN_FALLBACK;
  };

  const setImage = (key: string, srcOrBase64: string) => {
    if (!isValidImageSrc(srcOrBase64)) return;
    setImages((prev) => {
      const updated = { ...prev, [key]: srcOrBase64 };
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to write to localStorage on setImage:', e);
      }
      return updated;
    });
  };

  const saveUploadedFile = async (key: string, file: File): Promise<string> => {
    try {
      const base64 = await convertFileToBase64(file);
      setImage(key, base64);
      return base64;
    } catch (err) {
      console.error('Error saving uploaded file:', err);
      throw err;
    }
  };

  const resetImage = (key: string) => {
    setImages((prev) => {
      const updated = { ...prev };
      if (DEFAULT_IMAGES[key]) {
        updated[key] = DEFAULT_IMAGES[key];
      } else {
        delete updated[key];
      }
      return updated;
    });
  };

  return (
    <ImageContext.Provider
      value={{
        images,
        getImage,
        setImage,
        saveUploadedFile,
        resetImage,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
}

export function useImageStore(): ImageContextType {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error('useImageStore must be used within an ImageProvider');
  }
  return context;
}
