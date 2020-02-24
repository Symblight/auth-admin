import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

import { LogoWrap, MenuUser } from './styled';

const { Header: HeaderComponent } = Layout;

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <HeaderComponent className={className} style={{ width: '100%' }}>
      <LogoWrap />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="admin">
          Администрирование
          <Link to="/d" />
        </Menu.Item>
        <MenuUser
          key="profile"
          title={
            <span>
              <Icon type="mail" />
              <span>Профиль</span>
            </span>
          }
        >
          <Menu.Item key="profile">
            Профиль
            <Link to="/profile" />
          </Menu.Item>
          <Menu.Item key="1">
            Выйти
            <Link to="/" />
          </Menu.Item>
        </MenuUser>
      </Menu>
    </HeaderComponent>
  );
};
