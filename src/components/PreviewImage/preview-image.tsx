import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

import { useParams } from 'libs/useParams';

type TURLImage = {
  path: string;
  search: string;
  pathname?: string;
};

type URI = {
  uri: string;
};

interface ImageUrl {
  url: TURLImage;
}

const getUrl = (props: URI) => props.uri;

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

export const PreviewImage: React.FC<ImageUrl> = ({ url }) => {
  const params = useParams();

  return (
    <Image
      uri={params.parse('photo', url.search) || '#'}
      to={{
        pathname: url.path,
        search: `${params.removeParams('photo')}photo=${params.parse('photo', url.search)}`,
      }}
    />
  );
};
