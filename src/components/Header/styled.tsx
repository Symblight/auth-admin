import styled from 'styled-components';

import { Menu } from 'antd';

const { SubMenu } = Menu;

export const LogoWrap = styled.div`
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
`;

export const MenuUser = styled(SubMenu)`
  float: right;
`;
