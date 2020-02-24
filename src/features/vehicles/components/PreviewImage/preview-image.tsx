import React from 'react';
import styled from 'styled-components';

import { Link, LinkProps } from 'react-router-dom';

interface ImageUrl extends LinkProps {
  url: string;
}

const getUrl = (props: ImageUrl) => props.url;

const Image = styled(Link)`
  background-image: url(${getUrl});
  width: 120px;
  height: 120px;
  display: block;
  overflow: hidden;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50%;
`;

export const PreviewImage: React.FC<ImageUrl> = ({ url, to }) => {
  return <Image url={url} to={to} />;
};
