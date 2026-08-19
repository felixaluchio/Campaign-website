/**
 * Global Image Utilities for Persistent Image Handling & Fallback Management
 */

import heroPortraitImg from '../assets/images/images/phyllis-wangui-hero.jpg';
import bioPortraitImg from '../assets/images/images/phyllis-wangui-bio-updated.jpg';
import herStoryCardImg from '../assets/images/images/phyllis-wangui-bio-2.jpg';
import whatGuidesHerImg from '../assets/images/regenerated_image_1787160412071.jpg';

export const DEFAULT_CAMPAIGN_FALLBACK = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200';
export const DEFAULT_HERO_IMAGE = heroPortraitImg || '/images/phyllis-wangui-hero.jpg';
export const DEFAULT_BIO_PORTRAIT = bioPortraitImg || '/images/phyllis-wangui-bio-updated.jpg';

// Distinct Fallbacks for isolated photo cards:
// 1. Her Story Card: Focused on professional community engagement
export const DEFAULT_HER_STORY_PHOTO = herStoryCardImg || '/images/phyllis-wangui-bio-2.jpg';

// 2. What Guides Her Card: Focused on leadership/values presentation
export const DEFAULT_WHAT_GUIDES_HER_PHOTO = whatGuidesHerImg || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200';

// 3. Rooted in Kiambu Card: Focused on local grassroots outreach
export const DEFAULT_ROOTED_IN_KIAMBU_PHOTO = 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=1200';

// 4. Vision Photo 5: Leadership team walk
export const DEFAULT_VISION_PHOTO5 = '/images/photo5.jfif';

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
