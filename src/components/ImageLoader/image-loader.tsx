import React, { useRef, useEffect, useState } from 'react';

import { Image } from './styled';

interface ImageLoaderProps {
  src: string;
  onWidth: (width: number) => void;
}

export const ImageLoader: React.FC<ImageLoaderProps> = ({ src, onWidth }) => {
  const [size, setSize] = useState({});
  const ref = useRef<HTMLImageElement>(null);

  function calculateAspectRatioFit(
    srcWidth: number,
    srcHeight: number,
    maxWidth: number,
    maxHeight: number,
  ) {
    const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

    return { width: srcWidth * ratio, height: srcHeight * ratio };
  }

  useEffect(() => {
    if (ref.current) {
      const widthClient = ref.current.getBoundingClientRect().width;
      const heightClient = ref.current.getBoundingClientRect().height;

      setSize({
        ...calculateAspectRatioFit(widthClient, heightClient, 855, 630),
      });

      onWidth(calculateAspectRatioFit(widthClient, heightClient, 855, 630).width + 50);
    }
  }, [onWidth]);

  return <Image style={{ ...size }} ref={ref} src={src || '#'} alt="img" />;
};
