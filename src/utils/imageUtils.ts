/**
 * Global Image Utilities for Persistent Image Handling & Fallback Management
 */

import heroPortraitImg from '../assets/images/images/phyllis-wangui-hero.jpg';
import bioPortraitImg from '../assets/images/images/phyllis-wangui-bio-updated.jpg';
import herStoryCardImg from '../assets/images/images/phyllis-wangui-bio-2.jpg';
import quoteCardBgImg from '../assets/images/images/quote-card-bg.jpg';
import whatGuidesHerImg from '../assets/images/photo5.jpg';
import rootedInKiambuImg from '../assets/images/regenerated_image_1787163099768.png';
import visionPhoto5Img from '../assets/images/photo5.jpg';

// Distinct Dedicated Image Assets
export const DEFAULT_CAMPAIGN_FALLBACK = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200';

// Distinct Dedicated Placeholder URLs to prove independent rendering
export const PLACEHOLDER_HERO_BANNER = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200';
export const PLACEHOLDER_CORE_VALUES_QUOTE = 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&q=80&w=1200';

// 1. Hero Section Dedicated Image / Background (Decoupled - uses heroPortraitImg)
export const heroBannerBg = heroPortraitImg || PLACEHOLDER_HERO_BANNER;
export const DEFAULT_HERO_BG_IMAGE = heroBannerBg;
export const DEFAULT_HERO_IMAGE = heroBannerBg; // Backwards-compatible alias

// 2. What Guides Her / Core Values Quote Card Dedicated Background Image (Decoupled - uses quote-card-bg.jpg)
export const coreValuesQuoteBg = quoteCardBgImg || '/images/quote-card-bg.jpg';
export const DEFAULT_WHAT_GUIDES_HER_CARD_IMAGE = coreValuesQuoteBg;
export const DEFAULT_WHAT_GUIDES_HER_PHOTO = coreValuesQuoteBg; // Backwards-compatible alias
export const DEFAULT_CORE_VALUES_CARD_IMAGE = coreValuesQuoteBg; // Alias

// 3. Meet Phyllis Bio Portrait
export const DEFAULT_BIO_PORTRAIT = bioPortraitImg || '/images/phyllis-wangui-bio-updated.jpg';

// 4. Her Story Card (Professional / community engagement)
export const DEFAULT_HER_STORY_PHOTO = herStoryCardImg || '/images/phyllis-wangui-bio-2.jpg';

// 5. Rooted in Kiambu Card (Grassroots outreach)
export const DEFAULT_ROOTED_IN_KIAMBU_PHOTO = rootedInKiambuImg || 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=1200';

// 6. Vision Photo 5: Dedicated Banner Visual
export const DEFAULT_VISION_PHOTO5 = visionPhoto5Img || '/images/photo5.jpg';

/**
 * Converts an uploaded File into a persistent Base64 Data URL string
 */
export function convertFileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided'));
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === 'string' && result.length > 0) {
        resolve(result);
      } else {
        reject(new Error('Failed to convert file to Base64'));
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

/**
 * Validates if a string is a non-empty image source
 */
export function isValidImageSrc(src?: string | null): boolean {
  if (!src) return false;
  const trimmed = src.trim();
  if (trimmed === '' || trimmed === 'null' || trimmed === 'undefined') return false;
  return true;
}
