import React, { useState } from 'react';

import { Modal } from 'antd';

import { History, Location } from 'history';

import { ImageLoader } from 'components';

interface ModalImageProps {
  location: Location;
  history: History;
}

export const ModalImage: React.FC<ModalImageProps> = ({ location, history }) => {
  const params = new URLSearchParams(location.search);
  const [widthModal, setWidthModal] = useState(410);

  function handleWidth(width: number) {
    setWidthModal(width);
  }

  if (!params.get('photo')) return null;

  return (
    <Modal
      onCancel={() => {
        history.push(location.pathname);
      }}
      visible={Boolean(params.get('photo'))}
      footer={false}
      closable={false}
      width={widthModal}
    >
      <ImageLoader onWidth={handleWidth} src={params.get('photo') || '#'} />
    </Modal>
  );
};
