import { useState, useEffect, ImgHTMLAttributes, SyntheticEvent } from 'react';
import { DEFAULT_CAMPAIGN_FALLBACK, isValidImageSrc } from '../../utils/imageUtils';

export interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
  src?: string | null;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  onError?: (e: SyntheticEvent<HTMLImageElement, Event>) => void;
}

export function ImageWithFallback({
  src,
  fallbackSrc = DEFAULT_CAMPAIGN_FALLBACK,
  alt,
  className = '',
  onError,
  ...props
}: ImageWithFallbackProps) {
  const initialSrc = isValidImageSrc(src) ? (src as string) : fallbackSrc;
  const [imgSrc, setImgSrc] = useState<string>(initialSrc);
  const [hasErrored, setHasErrored] = useState<boolean>(false);

  useEffect(() => {
    if (isValidImageSrc(src)) {
      setImgSrc(src as string);
      setHasErrored(false);
    } else {
      setImgSrc(fallbackSrc);
      setHasErrored(false);
    }
  }, [src, fallbackSrc]);

  const handleError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    if (!hasErrored && imgSrc !== fallbackSrc) {
      setHasErrored(true);
      setImgSrc(fallbackSrc);
    }
    if (onError) {
      onError(e);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      referrerPolicy="no-referrer"
      {...props}
    />
  );
}

