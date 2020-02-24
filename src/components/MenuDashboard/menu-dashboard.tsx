import React from 'react';
import { Link } from 'react-router-dom';

import { Menu } from './styled';

interface MenuProps {
  className?: string;
}

export const MenuDashboard: React.FC<MenuProps> = () => {
  return (
    <Menu theme="light" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline">
      <Menu.Item key="cars">
        <span>Машины</span>
        <Link to="/d" />
      </Menu.Item>
      <Menu.Item key="rents">
        Аренда
        <Link to="/d/rents" />
      </Menu.Item>
      <Menu.Item key="sub4">
        <span>Пользователи</span>
        <Link to="/d/users" />
      </Menu.Item>
    </Menu>
  );
};
