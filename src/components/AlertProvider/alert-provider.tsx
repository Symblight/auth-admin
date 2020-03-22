import React from 'react';
import { Alert } from 'antd';
import { Provider, positions, transitions, AlertComponentPropsWithStyle } from 'react-alert';

const alertOptions = {
  offset: '25px',
  timeout: 2000,
  transition: transitions.FADE,
};

const AlertTemplate: React.FC<AlertComponentPropsWithStyle> = ({
  style,
  options,
  message,
  close,
}) => (
  <Alert
    style={style}
    message="Error"
    description={message}
    type={options.type}
    showIcon
    closable
    onClose={close}
  />
);

interface AlertProviderProps {}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  return (
    <Provider template={AlertTemplate} position={positions.BOTTOM_LEFT} {...alertOptions}>
      {children}
    </Provider>
  );
};
