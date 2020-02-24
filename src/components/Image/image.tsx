import React from 'react';
import {} from './styled';

export interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const Image: React.FC<ImageProps> = ({ src, alt, className, ...props }) => {
  return <img {...props} src={src} alt={alt} className={className} />;
};
