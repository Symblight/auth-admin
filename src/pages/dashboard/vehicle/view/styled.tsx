import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Image = styled.img`
  width: 510px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const Photos = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 18px;

  a {
    margin-right: 12px;
  }
`;
